import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import { Grid, Col, Table } from 'react-bootstrap';

class Containers extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <Grid>
        <Col xs={3} md={2}>
          <Sidebar
            refresh={this.props.refresh}
            overview
            items={this.props.containers}
            icon={'fa fa-cube'}
          />
        </Col>
        <Col xs={9} md={10}>
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
              {this.props.containers.map((container, index) =>
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
              )}
            </tbody>
          </Table>
        </Col>
      </Grid>
    )
  }
}

export default Containers;
