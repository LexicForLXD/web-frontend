import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import LogShow from './LogShow.js';
import { Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import queryString from 'query-string';
import Toggle from 'react-bootstrap-toggle';

/**
 *  Log (top level) page component
 */
class LogPage extends Component {
  constructor(props) {
    super();
    this.state = {
      toggleContainers: true
    };
  }

  /** Gets called once component has mounted. Fetches containers and hosts. */
  componentDidMount() {
    this.getContainersAndHosts();
  }

  /** Fetches containers and hosts. */
  getContainersAndHosts = () => {
    this.props.httpGetContainers();
    this.props.httpGetHosts();
  }

  /** Toggle button change handler */
  toggleContainers = () => {
    const toggleContainers = !this.state.toggleContainers;
    this.setState({ toggleContainers: toggleContainers });
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <Grid fluid>
        <Col xs={3} md={2}>
          <Toggle
            onClick={this.toggleContainers}
            on={<b>Containers</b>}
            off={<b>Hosts</b>}
            size="md"
            onstyle="success"
            offstyle="info"
            active={this.state.toggleContainers}
            className="ToggleBtn"
          />
          <Sidebar
            parent={this.state.toggleContainers ?
                    'logs/containers' : 'logs/hosts'}
            refresh={this.getContainersAndHosts}
            items={this.state.toggleContainers ?
                   this.props.containers : this.props.hosts}
            icon={this.state.toggleContainers ?
                  'fa fa-cube' : 'fa fa-server'}
          />
        </Col>
        <Col xs={9} md={10}>
          <Route
            exact path="/logs"
            render={() => <h6>Please choose a container or host from the sidebar</h6>}
          />
          <Route
            path={this.state.toggleContainers ?
                  '/logs/containers/show' : '/logs/hosts/show'}
            render={() => <LogShow
                            apiUrl={this.props.apiUrl}
                            accessToken={this.props.accessToken}
                            containerId={queryString.parse(window.location.search).id}
                            httpRequest={this.props.httpRequest}
                            toggleContainers={this.state.toggleContainers}
                          />}
          />
        </Col>
      </Grid>
    )
  }
}

export default LogPage;
