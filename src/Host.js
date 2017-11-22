import React, { Component } from 'react';
import './App.css';
import HostEdit from './HostEdit.js';
import { Table, Button } from 'react-bootstrap';
import queryString from 'query-string';

class Host extends Component {
  constructor(props) {
    super();
    this.state = {
      editView: false,
      host: {
        id: '',
        name: '',
        ipv4: '',
        ipv6: '',
        domain_name: '',
        mac: '',
        settings: ''
      }
    }
  }

  componentDidMount () {
    this.httpGetHost();
  }

  toggleEditView = () => {
    this.setState({ editView: !this.state.editView });
  }

  httpGetHost = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', `hosts/${id}`, null, json => {
      this.setState({
        host: json
      })
        // this.props.goBack();
        // this.props.refresh();
      }
    );
  }

  httpDeleteHost = () => {
    this.props.httpRequest('DELETE', `hosts/${this.props.host.id}`, null, () => {
        this.props.goBack();
        this.props.refresh();
      }
    );
  }

  render() {
    return (
      <div>
        <Table bordered condensed responsive>
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
              <td>{this.state.host.domain_name}</td>
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
            refresh={this.props.refresh}
            goBack={this.props.goBack}
            httpRequest={this.props.httpRequest}
          />
        }
      </div>
    )
  }
}

export default Host;
