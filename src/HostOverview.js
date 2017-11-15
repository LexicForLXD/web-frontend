import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';

class HostOverview extends Component {
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
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          {this.props.hosts instanceof Array &&
            this.props.hosts.map((host, index) =>
              <tr key={index}>
                <td>{host.name}</td>
                <td>{host.ipv4}</td>
                <td>{host.ipv6}</td>
                <td>{host.mac}</td>
                <td>{host.settings}</td>
                <td>
                  <button type="button" className="btn">
                    <i className="fa fa-play"></i>
                  </button>
                  <button type="button" className="btn">
                    <i className="fa fa-stop"></i>
                  </button>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    )
  }
}

export default HostOverview;
