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
    this.state = {
      containers: [],
      hosts: []
    };
  }

  switchPageItems = () => {
    switch (this.props.page) {
      case 'containers':
        return (
          <Containers
            containers={this.state.containers}
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

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    switch (this.props.page) {
      case 'containers':
        this.fetchContainers();
        break;
      case 'hosts':
        this.fetchHosts();
        break;
    }
  }

  fetchContainers = () => {
    this.setState({
      containers: [  // To be replaced with a fetch()-from-api method call
        {
          name: "Container 1",
          ip: "10.16.18.20",
          status: "running"
        },
        {
          name: "Container 2",
          ip: "10.16.18.21",
          status: "stopped"
        },
        {
          name: "Container 3",
          ip: "10.16.18.22",
          status: "running"
        }
      ]
    })
  }

  fetchHosts = () => {
    this.setState({
      hosts: [  // To be replaced with a fetch()-from-api method call
        {
          name: "Host 1",
          ip: "10.16.18.20",
          status: "running"
        },
        {
          name: "Host 2",
          ip: "10.16.18.21",
          status: "stopped"
        },
        {
          name: "Host 3",
          ip: "10.16.18.22",
          status: "running"
        }
      ],
    })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={3} md={2}>
            <Sidebar
              page={this.props.page}
              containers={this.state.containers}
              hosts={this.state.hosts}
              refresh={this.refresh}
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
