import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';

/**
 *  Host overview UI component
 */
class HostOverview extends Component {
  constructor(props) {
    super();
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
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
          {this.props.hosts instanceof Array &&
            this.props.hosts.map(host =>
              <tr key={host.id}>
                <td>{host.name}</td>
                <td>{host.ipv4}</td>
                <td>{host.ipv6}</td>
                <td>{host.domainName}</td>
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
