import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import ContainerOverview from './ContainerOverview.js';
// import ContainerCreate from './ContainerCreate.js';
// import ContainerShow from './ContainerShow.js';
import { Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

class ContainerPage extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: 'overview'
    };
  }

  componentDidMount() {
    this.props.httpGetHostsAndContainers();
  }

  render() {
    return (
      <Grid>
        <Col xs={3} md={2}>
          <Sidebar
            parent="containers"
            refresh={this.props.httpGetHostsAndContainers}
            overview
            create
            items={this.state.containers}
            icon={'fa fa-server'}
            select={this.select}
          />
        </Col>
        <Col xs={9} md={10}>
          <Route
            exact path="/containers"
            render={() => <ContainerOverview containers={this.props.containers} />}
          />
          {/* <Route
            path="/containers/overview"
            render={() => <ContainerOverview containers={this.props.containers} />}
          /> */}
          {/* <Route
            path="/containers/create"
            render={() => <ContainerCreate
                            httpGetHostsAndContainers={this.httpGetHostsAndContainers}
                            httpRequest={this.props.httpRequest}
                          />}
          />
          <Route
            path="/containers/show"
            render={() => <ContainerShow
                            id={queryString.parse(window.location.search).id}
                            httpGetHostsAndContainers={this.httpGetHostsAndContainers}
                            httpRequest={this.props.httpRequest}
                          />}
          /> */}
        </Col>
      </Grid>
    )
  }
}

export default ContainerPage;
