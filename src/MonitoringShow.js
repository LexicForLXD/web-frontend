import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';
import Image from 'react-image-file';

/**
 *  Monitoring detail view UI component
 */
class MonitoringShow extends Component {
  constructor(props) {
    super();
    this.state = {
      notFound: false,
      containerChecks: [],
      hostChecks: [],
      graphs: []
    }
  }

  /** Gets called once component has mounted. Fetches monitoring configuration. */
  componentDidMount() {
    this.getChecks();
  }

  /** Fetches either container checks or host checks, depending on container / host toggle state */
  getChecks = () => {
    if (this.props.toggleContainers)
      this.httpGetContainerChecks();
    else
      this.httpGetHostChecks();
  }

  /** Fetches container checks */
  httpGetContainerChecks = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', 'monitoring/checks/containers/' + id, null, obj => {
      if (obj.httpStatus === 200) {
        this.setState(
          { notFound: false, containerChecks: obj.jsonData },
          () => this.getGraphs()
        );
      } else {
        this.setState({ notFound: true });
      }
    })
  }

  /** Fetches host checks */
  httpGetHostChecks = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', 'monitoring/checks/hosts/' + id, null, obj => {
      if (obj.httpStatus === 404)
        this.setState({ notFound: true });
      else if (obj.httpStatus === 200)
        this.setState(
          { notFound: false, hostChecks: obj.jsonData },
          () => this.getGraphs()
        );
    })
  }

  /** Fetches either container graphs or host graphs, depending on container / host toggle state */
  getGraphs = () => {
    if (this.props.toggleContainers)
      this.state.containerChecks.forEach(cc => this.httpGetGraph(cc.id));
    else
      this.state.hostChecks.forEach(hc => this.httpGetGraph(hc.id));
  }

  /** Fetches graphs for check id */
  httpGetGraph = checkId => {
    const path = this.prop.toggleContainers ?
                 `monitoring/checks/${checkId}/containers/graph` :
                 `monitoring/checks/${checkId}/hosts/graph`;
    this.props.httpRequest('GET', path, null, obj => {
      if (obj.httpStatus === 404) {
        this.setState({ notFound: true });
      } else {
        const graphs = this.state.graphs;
        graphs.push(obj.jsonData);
        this.setState({ notFound: false, graphs: graphs })
      };
    })
  }

  /**
   * Gets called when different item is clicked on sidebar.
   * Fetches monitoring configuration.
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
          <div>
            {this.state.graphs.map(graph => <div><Image file={graph}/><br /></div>)}
          </div>
        }
      </div>
    )
  }
}

export default MonitoringShow;
