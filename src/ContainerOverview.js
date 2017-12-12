import React, { Component } from 'react';
import './App.css';
import { Table, Button } from 'react-bootstrap';

class ContainerOverview extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Table bordered responsive striped>
        <thead>
          <tr>
            <th>Status</th>
            <th>Control</th>
            <th>Host</th>
            <th>Name</th>
            <th>IPv4</th>
            <th>IPv6</th>
            <th>Domain Name</th>
            {/* <th>Settings</th> */}
          </tr>
        </thead>
        <tbody>
          {this.props.containers instanceof Array &&
            this.props.containers.map(container =>
              <tr key={container.id}>
                {/* <td>{this.props.containerStates[container.id]}</td> */}
                <td>{container.state}</td>
                <td>
                  <Button type="button" onClick={() => this.props.httpPutContainerState(container.id, 'start')}>
                    <i className="fa fa-play"></i>
                  </Button>
                  <Button type="button" onClick={() => this.props.httpPutContainerState(container.id, 'stop')}>
                    <i className="fa fa-stop"></i>
                  </Button>
                  <Button type="button" onClick={() => this.props.httpPutContainerState(container.id, 'restart')}>
                    <i className="fa fa-repeat"></i>
                  </Button>
                </td>
                <td>{container.host.name}</td>
                <td>{container.name}</td>
                <td>{container.ipv4}</td>
                <td>{container.ipv6}</td>
                <td>{container.domain_name}</td>
                {/* <td>{container.settings}</td> */}
              </tr>
            )
          }
        </tbody>
      </Table>
    )
  }
}

export default ContainerOverview;
