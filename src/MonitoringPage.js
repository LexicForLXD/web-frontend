import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import MonitoringShow from './MonitoringShow.js';
import { Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

/**
 *  Monitoring (top level) page component
 */
class MonitoringPage extends Component {
  constructor(props) {
    super();
    this.state = {
      charts: [
        'chart 1',
        'chart 2'
      ]
    };
  }

  /**
   * Gets called once component has mounted. Fetches containers.
   */
  componentDidMount() {
    this.httpGetCharts();
  }

  /**
   * Fetches charts
   */
  httpGetCharts = () => {
    // TODO
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
            parent="monitoring"
            refresh={this.httpGetCharts}
            items={this.state.charts}
            icon={'fa fa-chart'}
          />
        </Col>
        <Col xs={9} md={10}>
          <Route
            path="/monitoring/show"
            render={() => <MonitoringShow
                            id={queryString.parse(window.location.search).id}
                            httpGetCharts={this.httpGetCharts}
                            httpRequest={this.props.httpRequest}
                          />}
          />
        </Col>
      </Grid>
    )
  }
}

export default MonitoringPage;
