import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import LogShow from './LogShow.js';
import { Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

/**
 *  Log (top level) page component
 */
class LogPage extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  /**
   * Gets called once component has mounted. Fetches containers.
   */
  componentDidMount() {
    this.props.httpGetContainers();
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <Grid>
        <Col xs={3} md={2}>
          <Sidebar
            parent="logs"
            refresh={this.props.httpGetContainers}
            items={this.props.containers}
            icon={'fa fa-cube'}
            select={this.select}
          />
        </Col>
        <Col xs={9} md={10}>
          <Route
            path="/logs/show"
            render={() => <LogShow
                            apiUrl={this.props.apiUrl}
                            accessToken={this.props.accessToken}
                            containerId={queryString.parse(window.location.search).id}
                            httpRequest={this.props.httpRequest}
                          />}
          />
        </Col>
      </Grid>
    )
  }
}

export default LogPage;
