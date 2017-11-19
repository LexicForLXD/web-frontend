import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';

class HostOverview extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
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
          {this.props.hosts instanceof Array &&
            this.props.hosts.map((host, index) =>
              <tr key={index}>
                <td>{host.name}</td>
                <td>{host.ipv4}</td>
                <td>{host.ipv6}</td>
                <td>{host.domain_name}</td>
                <td>{host.mac}</td>
                <td>{host.settings}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    )
  }
}

export default HostOverview;
