import React, { Component } from 'react';
import './App.css';
// import ContainerEdit from './ContainerEdit.js';
import { Table, Button } from 'react-bootstrap';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

class ContainerShow extends Component {
  constructor(props) {
    super();
    this.state = {
      editView: false,
      container: {
        id: '',
        host: '',
        name: '',
        ipv4: '',
        ipv6: '',
        domain_name: '',
        settings: ''
      },
      containerState: ''
    }
  }

  componentDidMount () {
    this.httpGetContainer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.httpGetContainer();
    }
  }

  toggleEditView = () => {
    this.setState({ editView: !this.state.editView });
  }

  // findHostId = id => {
  //   const hostId = this.props.containers.find(
  //     container => container.id === id).host;
  // }

  httpGetContainer = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', `containers/${id}`, null, json => {
      this.setState({
        container: json
      });
      this.httpGetContainerState(id);
    });
  }

  httpGetContainerState = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', `containers/${id}/state`, null, json => {
      this.setState({ containerState: json.metadata.status });
    });
  }

  httpPutContainerState = action => {
    const id = queryString.parse(window.location.search).id;
    const body = JSON.stringify({
      action: action
    });
    this.props.httpRequest('PUT', `containers/${id}/state`, body, () => {
      this.httpGetContainerState(id);
    })
  }

  httpDeleteContainer = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('DELETE', `containers/${id}`, null, () => {
        // window.location.href = '/containers/overview';
        this.props.httpGetContainers();
        this.setState({ redirect: true });
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.redirect && <Redirect from="/containers/show" exact to="/containers" />}
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>Status</th>
              <th>Control</th>
              <th>Host</th>
              <th>Name</th>
              <th>IPv4</th>
              <th>IPv6</th>
              <th>Domain Name</th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.containerState}</td>
              <td>
                <Button type="button" onClick={() => this.httpPutContainerState('start')}>
                  <i className="fa fa-play"></i>
                </Button>
                <Button type="button" onClick={() => this.httpPutContainerState('stop')}>
                  <i className="fa fa-stop"></i>
                </Button>
                <Button type="button" onClick={() => this.httpPutContainerState('restart')}>
                  <i className="fa fa-repeat"></i>
                </Button>
              </td>
              <td>{this.state.container.host}</td>
              <td>{this.state.container.name}</td>
              <td>{this.state.container.ipv4}</td>
              <td>{this.state.container.ipv6}</td>
              <td>{this.state.container.domain_name}</td>
              <td>{this.state.container.settings}</td>
            </tr>
          </tbody>
        </Table>
        <Button
          type="button"
          className="Button"
          onClick={() => this.toggleEditView()}
        >
          <i className="fa fa-edit"></i> Edit Container
        </Button>
        <Button
          type="button"
          className="Button"
          onClick={() => this.httpDeleteContainer()}
        >
          <i className="fa fa-trash"></i> Delete Container
        </Button>
        {/* {this.state.editView &&
          <ContainerEdit
            container={this.state.container}
            httpGetContainers={this.props.httpGetContainers}
            httpRequest={this.props.httpRequest}
          />
        } */}
      </div>
    )
  }
}

export default ContainerShow;
