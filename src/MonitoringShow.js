import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

/**
 *  Monitoring detail view UI component
 */
class MonitoringShow extends Component {
  constructor(props) {
    super();
    this.state = {
      notFound: false,
      chart: ''
    }
  }

  /**
   * Gets called once component has mounted. Fetches monitoring.
   */
  componentDidMount () {
    this.httpGetChart();
  }

  /**
   * Gets called when different item is clicked on sidebar.
   * Fetches chart.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.httpGetChart();
    }
  }

  /** Fetches chart. */
  httpGetChart = () => {
    const id = queryString.parse(window.location.search).id;
    // TODO
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <div>
        {this.state.redirect && <Redirect from="/monitoring/show" exact to="/monitoring" />}
        {this.state.notFound &&
          <h6>Chart not found!</h6>
        }
        {!this.state.notFound &&
          <div>

          </div>
        }
      </div>
    )
  }
}

export default MonitoringShow;
