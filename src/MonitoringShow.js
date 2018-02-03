import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

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

  /** Fetches either container checks or host checks */
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

  /** Fetches either container graphs or host graphs */
  getGraphs = () => {
    if (this.props.toggleContainers)
      this.state.containerChecks.forEach(cc => this.httpGetGraph(cc.id));
    else
      this.state.hostChecks.forEach(hc => this.httpGetGraph(hc.id));
  }

  /** Fetches graphs for check id */
  httpGetGraph = checkId => {
    const path = this.props.toggleContainers ?
                 `monitoring/checks/${checkId}/containers/graph?timerange=-1day` :
                 `monitoring/checks/${checkId}/hosts/graph?timerange=-1day`;
    this.props.httpRequest('GET', path, null, obj => {
      if (obj.httpStatus === 404) {
        this.setState({ notFound: true });
      } else if (obj.httpStatus === 200) {
        const graphs = this.state.graphs;
        graphs.push(obj);
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
    // const reader = new FileReader();
    // this.state.graphs[0] && console.log('title', reader.readAsText(this.state.graphs[0].blob));
    return (
      <div>
        {this.state.notFound &&
          <h6>No monitoring configuration found!</h6>
        }
        {!this.state.notFound &&
          <div>
            {/* {this.state.graphs.map(graph => <div><Image file={graph.blob} alt='graph'/><br /></div>)} */}
            {/* {this.state.graphs.map(graph => <img src={'data:image/png;base64,' + reader.readAsText(graph.blob)} />)} */}
            {/* {
              this.state.graphs.map(graph => {
                const image = new Image();
                image.src = URL.createObjectURL(graph.blob);
                return <div>{image}</div>;
              })
            } */}
            {this.state.graphs.map(graph => <div><img class="graph" src={URL.createObjectURL(graph.blob)} alt="graph" /><br /></div>)}
          </div>
        }
      </div>
    )
  }
}

export default MonitoringShow;
