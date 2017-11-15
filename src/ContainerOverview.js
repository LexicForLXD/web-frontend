import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';

class ContainerOverview extends Component {
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
          {this.props.containers instanceof Array &&
            this.props.containers.map((container, index) =>
              <tr key={index}>
                <td>{container.status}</td>
                <td>{container.name}</td>
                <td>{container.ip}</td>
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

export default ContainerOverview;
