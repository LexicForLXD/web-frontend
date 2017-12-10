import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';

class ContainerOverview extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
      {this.props.containers.map(set =>
        <div>
          <h5>{set.host}</h5>
          <Table bordered responsive striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>IPv4</th>
                <th>IPv6</th>
                <th>Domain Name</th>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
            {set.containers instanceof Array &&
              set.containers.map(container =>
                <tr key={set.host}>
                  <td>{container.name}</td>
                  <td>{container.ipv4}</td>
                  <td>{container.ipv6}</td>
                  <td>{container.domain_name}</td>
                  <td>{container.settings}</td>
                </tr>
              )
            }
            </tbody>
          </Table>
        </div>
      )}
      </div>
    )
  }
}

export default ContainerOverview;
