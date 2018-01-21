import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import ContainerOverview from './ContainerOverview.js';
import ContainerCreate from './ContainerCreate.js';
import ContainerShow from './ContainerShow.js';
import { Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

/**
 *  Container (top-level) page component
 */
class ContainerPage extends Component {
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


  // /**
  //  * Starts container.
  //  */
  // startContainer = () => {
  //   this.httpRequest('GET', 'containers', null, obj => {
  //     this.setState({ containers: obj.jsonData })
  //   });
  // }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <Grid>
        <Col xs={3} md={2}>
          <Sidebar
            parent="containers"
            refresh={this.props.httpGetContainers}
            overview
            create
            items={this.props.containers}
            icon={'fa fa-cube'}
            select={this.select}
          />
        </Col>
        {!this.props.error &&
          <Col xs={9} md={10}>
            <Route
              exact path="/containers"
              render={() => <ContainerOverview
                              httpPutContainerState={this.props.httpPutContainerState}
                              containers={this.props.containers}
                              containerStates={this.props.containerStates}
                            />}
            />
            <Route
              path="/containers/create"
              render={() => <ContainerCreate
                              httpGetHosts={this.props.httpGetHosts}
                              hosts={this.props.hosts}
                              httpGetContainers={this.props.httpGetContainers}
                              containers={this.props.containers}
                              httpRequest={this.props.httpRequest}
                              httpGetProfiles={this.props.httpGetProfiles}
                              profiles={this.props.profiles}
                              httpGetImages={this.props.httpGetImages}
                              images={this.props.images}
                            />}
            />
            <Route
              path="/containers/show"
              render={() => <ContainerShow
                              id={queryString.parse(window.location.search).id}
                              httpGetContainers={this.props.httpGetContainers}
                              httpPutContainerState={this.props.httpPutContainerState}
                              httpRequest={this.props.httpRequest}
                            />}
            />
          </Col>
        }
      </Grid>
    )
  }
}

export default ContainerPage;
