import React, { Component } from 'react';
import './App.css';
import Console from './Console.js';
import Sidebar from './Sidebar.js';
import Containers from './Containers.js';
import { Grid, Row, Col, Table, Well } from 'react-bootstrap';

const LoadingView = () =>
  <Well bsSize="small" className="Console">
    Loading...
  </Well>

const ErrorView = () =>
  <Well bsSize="small" className="Console">
    Error loading data. Press "Refresh" button to try again.
  </Well>

class MainArea extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  switchPageItems = () => {
    switch (this.props.page) {
      case 'containers':
        return (
          <Containers
            containers={this.props.containers}
          />
        );
        break;
      case 'hosts':
        return (
          <div></div>
        );
        break;
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={3} md={2}>
            <Sidebar
              page={this.props.page}
              containers={this.props.containers}
              hosts={this.props.hosts}
              refresh={this.props.refresh}
            />
          </Col>
          <Col xs={9} md={10}>
            {this.switchPageItems()}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default MainArea;
