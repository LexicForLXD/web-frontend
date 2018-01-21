import React, { Component } from 'react';
import './App.css';
import ContainerPage from './ContainerPage.js';
import ProfilePage from './ProfilePage.js';
import ImagePage from './ImagePage.js';
import HostPage from './HostPage.js';
import MonitoringPage from './MonitoringPage.js';
import LogPage from './LogPage.js';
import { Well, Grid, Col } from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';

/**
 * Renders loading view component.
 * @returns {jsx} component html code
 */
const LoadingView = () =>
  <Well bsSize="small" className="Console">
    Loading...
  </Well>

/**
 * Renders error view component.
 * @param {props} props contains error message
 * @returns {jsx} component html code
 */
const ErrorView = props =>
  <Well bsSize="small" className="Console">
    {props.msg}
  </Well>

/**
 * Main area UI component
 */
class MainArea extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      error: false,
      containers: [],
      containerStates: [],
      hosts: [],
      profiles: [],
      images: []
    };
  }


  /**
   * Http request method.
   * @param {string} method http method
   * @param {string} path url path
   * @param {string} body http method body
   * @param {function} callBackfunction callback function to be called with http response body as argument
   */
  httpRequest = (method, path, body, callbackFunction) => {
    this.setState({
      loading: true
    });
    fetch(this.props.apiUrl + path, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`
      },
      body: body
    })
    .then(response => {
      console.log('Request response: ', response);
      if (response.status === 401) {
        this.props.logout();  // TODO try using refresh token before logging out
        Promise.reject();
      };
      const obj = {};
      obj.httpStatus = response.status;

      const contentType = response.headers.get('content-type');
      obj.isJson = (contentType && contentType.includes('application/json'));

      if (obj.isJson) {
        return response.json().then(json => {
          obj.jsonData = json;
          return obj;
        })
      }
      return obj;
    })
    .then(obj => {
      if (obj.jsonData)
        obj.jsonIsArray = (obj.jsonData instanceof Array) ? true : false;

      console.log('Request response JSON data: ', obj.jsonData);

      if (obj.jsonIsArray)
        obj.jsonArrayIsEmpty = (obj.jsonData.length === 0) ? true : false;

      callbackFunction(obj);
    })
    .then(() => {
      this.setState({
        loading: false,
        error: false
      });
    })
    .catch(error => {
      console.log('Request failed: ', error.message);
      this.setState({
        loading: false,
        error: error
      });
    });
  }


  /** Shows the current loading status */
  showStatus = () => {
    if (this.state.loading)
      return <LoadingView />;
    else if (this.state.error)
      return <ErrorView msg="Error loading. Try refreshing."/>;
  }


  /** Compares two object's names. To be used in Array.sort method */
  compareName = (a, b) => {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  /** Gets containers */
  httpGetContainers = () => {
    this.httpRequest('GET', 'containers', null, obj => {
      // if (!obj.jsonArrayIsEmpty) obj.jsonData.sort(this.compareName);  // TODO
      if (obj.httpStatus !== 200) return;
      obj.jsonData.sort(this.compareName);
      this.setState({ containers: obj.jsonData });
    });
  }

  /** Gets container state */
  httpGetContainerState = id => {
    this.httpRequest('GET', `containers/${id}/state`, null, obj => {
      if (obj.httpStatus !== 200) return;
      const containerStates = this.state.containerStates;
      containerStates[id] = obj.jsonData.metadata.status;
      this.setState({ containerStates: containerStates });
    });
  }

  /** Puts container state */
  httpPutContainerState = (id, action) => {
    const body = JSON.stringify({
      action: action
    });
    this.httpRequest('PUT', `containers/${id}/state`, body, () => {
      this.httpGetContainers();
    })
  }

  /** Gets hosts */
  httpGetHosts = () => {
    this.httpRequest('GET', 'hosts', null, obj => {
      if (obj.httpStatus !== 200) return;
      obj.jsonData.sort(this.compareName);
      this.setState({ hosts: obj.jsonData });
    })
  }

  /** Gets profiles */
  httpGetProfiles = () => {
    this.httpRequest('GET', 'profiles', null, obj => {
      if (obj.httpStatus !== 200) return;
      obj.jsonData.sort(this.compareName);
      this.setState({ profiles: obj.jsonData });
    })
  }

  /** Gets images */
  httpGetImages = () => {
    this.httpRequest('GET', 'images', null, obj => {
      if (obj.httpStatus !== 200) return;
      // obj.jsonData.sort(this.compareName);
      this.setState({ images: obj.jsonData });
    })
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <div>
        <Route exact path="/" render={() => <Redirect to="/containers" />} />
        <Route
          path="/containers"
          render={() => <ContainerPage
                          error={this.state.error}
                          httpRequest={this.httpRequest}
                          httpGetHosts={this.httpGetHosts}
                          hosts={this.state.hosts}
                          httpGetContainers={this.httpGetContainers}
                          httpPutContainerState={this.httpPutContainerState}
                          containers={this.state.containers}
                          containerStates={this.props.containerStates}
                          httpGetProfiles={this.httpGetProfiles}
                          profiles={this.state.profiles}
                          httpGetImages={this.httpGetImages}
                          images={this.state.images}
                        />}
        />
        <Route
          path="/profiles"
          render={() => <ProfilePage
                          error={this.state.error}
                          httpRequest={this.httpRequest}
                          httpGetProfiles={this.httpGetProfiles}
                          profiles={this.state.profiles}
                        />}
        />
        <Route
          path="/images"
          render={() => <ImagePage
                          error={this.state.error}
                          httpRequest={this.httpRequest}
                          hosts={this.state.hosts}
                          httpGetHosts={this.httpGetHosts}
                          httpGetImages={this.httpGetImages}
                          images={this.state.images}
                          httpGetContainers={this.httpGetContainers}
                          containers={this.state.containers}
                        />}
        />
        <Route
          path="/hosts"
          render={() => <HostPage
                          error={this.state.error}
                          httpRequest={this.httpRequest}
                          httpGetHosts={this.httpGetHosts}
                          hosts={this.state.hosts}
                        />}
        />
        <Route
          path="/monitoring"
          render={() => <MonitoringPage
                          httpGetHosts={this.httpGetHosts}
                          hosts={this.state.hosts}
                          httpGetContainers={this.httpGetContainers}
                          containers={this.state.containers}
                          httpRequest={this.httpRequest}
                        />}
        />
        <Route
          path="/logs"
          render={() => <LogPage
                          accessToken={this.props.accessToken}
                          error={this.state.error}
                          httpRequest={this.httpRequest}
                          httpGetContainers={this.httpGetContainers}
                          containers={this.state.containers}
                        />}
        />
        <Route
          path="/backup"
          render={() => <div></div>}
        />
        <Grid>
          <Col xs={9} xsOffset={3} md={10} mdOffset={2}>
            {this.showStatus()}
          </Col>
        </Grid>
      </div>
    )
  }
}

export default MainArea;
