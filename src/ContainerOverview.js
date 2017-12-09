import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';

class ContainerOverview extends Component {
  constructor(props) {
    super();
  }

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
          {this.props.containers instanceof Array &&
            this.props.containers.map((container, index) =>
              <tr key={index}>
                <td>{container.name}</td>
                <td>{container.ipv4}</td>
                <td>{container.ipv6}</td>
                <td>{container.domain_name}</td>
                <td>{container.mac}</td>
                <td>{container.settings}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    )
  }
}

export default ContainerOverview;
