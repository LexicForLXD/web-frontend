import React, { Component } from 'react';
import './App.css';
import HostEdit from './HostEdit.js';
import { Table, Button } from 'react-bootstrap';

class Host extends Component {
  constructor(props) {
    super();
    this.state = {
      editView: false
    }
  }

  toggleEditView = () => {
    this.setState({ editView: !this.state.editView });
  }

  httpDeleteHost = () => {
    this.props.httpRequest('DELETE', `hosts/${this.props.host.id}`, {}, () => {
        this.props.goBack();
        this.props.refresh();
      }
    );
  }

  render() {
    return (
      <div>
        <Table bordered condensed>
          <thead>
            <tr>
              <th>Name</th>
              <th>IPv4</th>
              <th>IPv6</th>
              <th>MAC</th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.host.name}</td>
              <td>{this.props.host.ipv4}</td>
              <td>{this.props.host.ipv6}</td>
              <td>{this.props.host.mac}</td>
              <td>{this.props.host.settings}</td>
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
            host={this.props.host}
            refresh={this.props.refresh}
            httpRequest={this.props.httpRequest}
          />
        }
      </div>
    )
  }
}

export default Host;
