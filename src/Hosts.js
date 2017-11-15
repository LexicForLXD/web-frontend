import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import HostOverview from './HostOverview.js';
import HostCreate from './HostCreate.js';
import { Grid, Col, Table } from 'react-bootstrap';

class Hosts extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: 'overview'
    };
  }

  select = (key) => {
    this.setState({
      selected: key
    });
  }

  showItem = () => {
    switch (this.state.selected) {
      case 'overview':
        return <HostOverview hosts={this.props.hosts} />;
      case 'create':
        return <HostCreate />;
      default:
        return <div></div>;
    }
  }

  render() {
    return (
      <Grid>
        <Col xs={3} md={2}>
          <Sidebar
            refresh={this.props.refresh}
            overview
            create
            items={this.props.hosts}
            icon={'fa fa-server'}
            select={this.select}
          />
        </Col>
        <Col xs={9} md={10}>
          {this.showItem()}
        </Col>
      </Grid>
    )
  }
}

export default Hosts;
