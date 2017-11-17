import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';

class Host extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
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
    )
  }
}

export default Host;
