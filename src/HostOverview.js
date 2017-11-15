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
            <th>Status</th>
            <th>Name</th>
            <th>IP Address</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          {this.props.hosts.map((host, index) =>
            <tr key={index}>
              <td>{host.status}</td>
              <td>{host.name}</td>
              <td>{host.ip}</td>
              <td>
                <button type="button" className="btn">
                  <i className="fa fa-play"></i>
                </button>
                <button type="button" className="btn">
                  <i className="fa fa-stop"></i>
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}

export default HostOverview;
