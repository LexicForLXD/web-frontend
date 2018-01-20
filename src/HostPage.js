import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import HostOverview from './HostOverview.js';
import HostCreate from './HostCreate.js';
import HostShow from './HostShow.js';
import { Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

/**
 *  Host (top level) page component
 */
class HostPage extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  /**
   * Gets called once component has mounted. Fetches containers.
   */
  componentDidMount() {
    this.props.httpGetHosts();
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
            parent="hosts"
            refresh={this.props.httpGetHosts}
            overview
            create
            items={this.props.hosts}
            icon={'fa fa-server'}
            select={this.select}
          />
        </Col>
        <Col xs={9} md={10}>
          <Route
            exact path="/hosts"
            render={() => <HostOverview hosts={this.props.hosts} />}
          />
          <Route
            path="/hosts/create"
            render={() => <HostCreate
                            httpGetHosts={this.props.httpGetHosts}
                            hosts={this.state.hosts}
                            httpRequest={this.props.httpRequest}
                          />}
          />
          <Route
            path="/hosts/show"
            render={() => <HostShow
                            id={queryString.parse(window.location.search).id} // still needed?
                            httpGetHosts={this.props.httpGetHosts}
                            httpRequest={this.props.httpRequest}
                          />}
          />
        </Col>
      </Grid>
    )
  }
}

export default HostPage;
