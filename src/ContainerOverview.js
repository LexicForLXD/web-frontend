import React, { Component } from 'react';
import './App.css';
import { Table, Button } from 'react-bootstrap';

class ContainerOverview extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
      {this.props.containers.filter(set => set.containers instanceof Array).map(set =>
        <div>
          <h5>{set.host}</h5>
          <Table bordered responsive striped>
            <thead>
              <tr>
                <th>Control</th>
                <th>Name</th>
                <th>IPv4</th>
                <th>IPv6</th>
                <th>Domain Name</th>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
            {set.containers.map(container =>
              <tr key={set.host}>
                <td>
                  {/* <Button type="button" onClick={() => this.props.startContainer()}> */}
                  <button type="button" className="btn">
                    <i className="fa fa-play"></i>
                  </button>
                  <button type="button" className="btn">
                    <i className="fa fa-stop"></i>
                  </button>
                  <button type="button" className="btn">
                    <i className="fa fa-repeat"></i>
                  </button>
                </td>
                <td>{container.name}</td>
                <td>{container.ipv4}</td>
                <td>{container.ipv6}</td>
                <td>{container.domain_name}</td>
                <td>{container.settings}</td>
              </tr>
            )}
            </tbody>
          </Table>
        </div>
      )}
      </div>
    )
  }
}

export default ContainerOverview;
