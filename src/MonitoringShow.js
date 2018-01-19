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
      containerChecks: {},
      hostChecks: {}
    }
  }

  /**
   * Gets called once component has mounted. Fetches monitoring.
   */
  componentDidMount() {
    this.getChecks();
  }

  getChecks = () => {
    if (this.props.toggleContainers)
      this.httpGetContainerChecks();
    else
      this.httpGetHostChecks();
  }

  httpGetContainerChecks = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', 'monitoring/checks/containers/' + id, null, obj => {
      if (obj.httpStatus === 404)
        this.setState({ notFound: true });
      else
        this.setState({ notFound: false, containerChecks: obj.jsonData });
    })
  }

  httpGetHostChecks = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', 'monitoring/checks/hosts/' + id, null, obj => {
      if (obj.httpStatus === 404)
        this.setState({ notFound: true });
      else
        this.setState({ notFound: false, hostChecks: obj.jsonData });
    })
  }

  /**
   * Gets called when different item is clicked on sidebar.
   * Fetches chart.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.getChecks();
    }
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <div>
        {this.state.notFound &&
          <h6>No monitoring configuration found!</h6>
        }
        {!this.state.notFound &&
          <div></div>
        }
      </div>
    )
  }
}

export default MonitoringShow;
