import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import ContainerOverview from './ContainerOverview.js';
import { Grid, Col, Table } from 'react-bootstrap';

class Containers extends Component {
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
        return <ContainerOverview containers={this.props.containers} />;
      case 'create':
        return <div></div>;
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
            items={this.props.containers}
            icon={'fa fa-cube'}
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

export default Containers;
