import React, { Component } from 'react';
import './App.css';
import { Table, Button } from 'react-bootstrap';

class Host extends Component {
  constructor(props) {
    super();
  }

  httpDeleteHost = () => {
    this.props.httpRequest('DELETE', `hosts/${this.props.host.id}`,
      () => console.log('Deleted host.'));
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
        <Button type="button" className="DeleteBtn" onClick={() => this.httpDeleteHost()}>
          <i className="fa fa-trash"></i> Delete Host
        </Button>
      </div>
    )
  }
}

export default Host;
