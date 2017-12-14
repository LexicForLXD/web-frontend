import React, { Component } from 'react';
import './App.css';
import ContainerEdit from './ContainerEdit.js';
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

  httpGetContainer = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', `containers/${id}`, null, json => {
      this.setState({
        container: json
      });
      // this.httpShowGetContainerState(id);
    });
  }

  httpShowGetContainerState = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', `containers/${id}/state`, null, json => {
      this.setState({ containerState: json.metadata.status });
    });
  }

  httpShowPutContainerState = action => {
    const id = queryString.parse(window.location.search).id;
    const body = JSON.stringify({
      action: action
    });
    this.props.httpRequest('PUT', `containers/${id}/state`, body, () => {
      this.httpShowGetContainerState(id);
    })
  }

  httpDeleteContainer = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('DELETE', `containers/${id}`, null, () => {
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.container.state}</td>
              <td>
                <Button type="button" onClick={() => this.httpShowPutContainerState('start')}>
                  <i className="fa fa-play"></i>
                </Button>
                <Button type="button" onClick={() => this.httpShowPutContainerState('stop')}>
                  <i className="fa fa-stop"></i>
                </Button>
                <Button type="button" onClick={() => this.httpShowPutContainerState('restart')}>
                  <i className="fa fa-repeat"></i>
                </Button>
              </td>
              <td>{this.state.container.host.name}</td>
              <td>{this.state.container.name}</td>
              <td>{this.state.container.ipv4}</td>
              <td>{this.state.container.ipv6}</td>
              <td>{this.state.container.domain_name}</td>
            </tr>
          </tbody>
        </Table>
        <h5><b>Settings</b></h5>
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>Architecture</th>
              <th>Ephermeral</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.container.settings.architecture}</td>
              <td>{this.state.container.settings.ephermeral ? 'true' : 'false'}</td>
            </tr>
          </tbody>
        </Table>
        <h5><b>Source</b></h5>
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>Type</th>
              <th>Mode</th>
              <th>Server</th>
              <th>Protocol</th>
              <th>Alias</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.container.settings.source ? this.state.container.settings.source.type : ''}</td>
              <td>{this.state.container.settings.source ? this.state.container.settings.source.mode : ''}</td>
              <td>{this.state.container.settings.source ? this.state.container.settings.source.server : ''}</td>
              <td>{this.state.container.settings.source ? this.state.container.settings.source.protocol : ''}</td>
              <td>{this.state.container.settings.source ? this.state.container.settings.source.alias : ''}</td>
            </tr>
          </tbody>
        </Table>
        <h5><b>Host</b></h5>
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Domain Name</th>
              <th>Port</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.container.host ? this.state.container.host.name : ''}</td>
              <td>{this.state.container.host ? this.state.container.host.domain_name : ''}</td>
              {/* <td>{this.state.container.host ? this.state.container.host.port : ''}</td> */}
              <td>8443</td>
            </tr>
          </tbody>
        </Table>
        <h5><b>Config</b></h5>
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>CPU Limit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td>{this.state.container.settings.config ? this.state.container.settings.config['limits.cpu'] : ''}</td> */}
              <td>2</td>
            </tr>
          </tbody>
        </Table>
        <h5><b>Devices: Root</b></h5>
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>path</th>
              <th>type</th>
              <th>pool</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.container.settings.devices ?
                   this.state.container.settings.devices.root ?
                   this.state.container.settings.devices.root.path : '' : ''}</td>
              <td>{this.state.container.settings.devices ?
                   this.state.container.settings.devices.root ?
                   this.state.container.settings.devices.root.type : '' : ''}</td>
              <td>{this.state.container.settings.devices ?
                   this.state.container.settings.devices.root ?
                   this.state.container.settings.devices.root.pool : '' : ''}</td>
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
        {this.state.editView &&
          <ContainerEdit
            container={this.state.container}
            httpGetContainers={this.props.httpGetContainers}
            httpRequest={this.props.httpRequest}
          />
        }
      </div>
    )
  }
}

export default ContainerShow;
