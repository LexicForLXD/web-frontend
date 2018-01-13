import React, { Component } from 'react';
import './App.css';
import HostEdit from './HostEdit.js';
import { Table, Button } from 'react-bootstrap';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

/**
 *  Host detail view UI component
 */
class HostShow extends Component {
  constructor(props) {
    super();
    this.state = {
      editView: false,
      host: {
        id: '',
        name: '',
        ipv4: '',
        ipv6: '',
        domainName: '',
        mac: '',
        settings: ''
      }
    }
  }

  /**
   * Gets called once component has mounted. Fetches host.
   */
  componentDidMount () {
    this.httpGetHost();
  }

  /**
   * Gets called when different host is clicked on sidebar.
   * Fetches host.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.httpGetHost();
    }
  }

  /** Toggles edit view. */
  toggleEditView = () => {
    this.setState({ editView: !this.state.editView });
  }

  /** Fetches host. */
  httpGetHost = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', `hosts/${id}`, null, obj => {
      this.setState({
        host: obj.jsonData
      })
    });
  }

  /** Deletes host. */
  httpDeleteHost = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('DELETE', `hosts/${id}`, null, () => {
        this.props.httpGetHosts();
        this.setState({ redirect: true });
      }
    );
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <div>
        {this.state.redirect && <Redirect from="/hosts/show" exact to="/hosts" />}
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>IPv4</th>
              <th>IPv6</th>
              <th>Domain Name</th>
              <th>MAC</th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.host.name}</td>
              <td>{this.state.host.ipv4}</td>
              <td>{this.state.host.ipv6}</td>
              <td>{this.state.host.domainName}</td>
              <td>{this.state.host.mac}</td>
              <td>{this.state.host.settings}</td>
            </tr>
          </tbody>
        </Table>
        <Button
          type="button"
          className="Button"
          onClick={() => this.toggleEditView()}
        >
          <i className="fa fa-edit"></i> Edit Host
        </Button>
        <Button
          type="button"
          className="Button"
          onClick={() => this.httpDeleteHost()}
        >
          <i className="fa fa-trash"></i> Delete Host
        </Button>
        {this.state.editView &&
          <HostEdit
            host={this.state.host}
            httpGetHosts={this.props.httpGetHosts}
            httpRequest={this.props.httpRequest}
          />
        }
      </div>
    )
  }
}

export default HostShow;
