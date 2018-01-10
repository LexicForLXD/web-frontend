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
        host: {
          name: '',
          domainName: ''
        },
        name: '',
        ipv4: '',
        settings: {},
        state: ''
      }
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
    this.props.httpRequest('GET', `containers/${id}`, null, obj => {
      this.setState({
        container: obj.jsonData[0]
      });
    });
  }

  httpGetContainerState = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', `containers/${id}/state`, null, obj => {
      this.setState({ containerState: obj.jsonData.metadata.status });
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
              <th>Name</th>
              <th>Status</th>
              <th>Control</th>
              <th>IPv4</th>
              <th>Host</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.container.name}</td>
              <td>{this.state.container.state}</td>
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
              <td>{this.state.container.ipv4}</td>
              <td>{this.state.container.host ? this.state.container.host.name : ''}</td>
            </tr>
          </tbody>
        </Table>
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{textAlign: 'left'}}><pre>{JSON.stringify(this.state.container.settings, null, 2)}</pre></td>
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
