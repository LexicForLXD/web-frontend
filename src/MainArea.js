import React, { Component } from 'react';
import './App.css';
import ContainerPage from './ContainerPage.js';
import ProfilePage from './ProfilePage.js';
import ImagePage from './ImagePage.js';
import HostPage from './HostPage.js';
import { Well, Grid, Col } from 'react-bootstrap';
import { Route, Redirect } from 'react-router-dom';

const LoadingView = () =>
  <Well bsSize="small" className="Console">
    Loading...
  </Well>

const ErrorView = () =>
  <Well bsSize="small" className="Console">
    Error loading data. Try refreshing.
  </Well>

class MainArea extends Component {
  constructor(props) {
    super();
    this.state = {
      url: 'https://lxd-api.lleon.de/',  // Replace in production
      loading: false,
      error: false,
      containers: [],
      containerStates: [],
      hosts: [],
      profiles: [],
      images: []
    };
  }

  httpRequest = (method, path, body, callbackFunction) => {
    this.setState({
      loading: true
    });
    fetch(this.state.url + path, {
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
      console.log('Request failed: ', error);
      this.setState({
        loading: false,
        error: true
      });
    });
  }

  compareName = (a, b) => {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  httpGetContainers = () => {
    this.httpRequest('GET', 'containers', null, obj => {
      // if (!obj.isArray) throw 'json is not an array';  // TODO
      // if (!obj.jsonArrayIsEmpty) obj.jsonData.sort(this.compareName);  // TODO
      obj.jsonData.sort(this.compareName);
      this.setState({ containers: obj.jsonData });
    });
  }

  httpGetContainerState = id => {
    this.httpRequest('GET', `containers/${id}/state`, null, obj => {
      const containerStates = this.state.containerStates;
      containerStates[id] = obj.jsonData.metadata.status;
      this.setState({ containerStates: containerStates });
    });
  }

  httpPutContainerState = (id, action) => {
    const body = JSON.stringify({
      action: action
    });
    this.httpRequest('PUT', `containers/${id}/state`, body, () => {
    })
  }

  httpGetHosts = () => {
    this.httpRequest('GET', 'hosts', null, obj => {
      obj.jsonData.sort(this.compareName);
      this.setState({ hosts: obj.jsonData });
    })
  }

  httpGetProfiles = () => {
    this.httpRequest('GET', 'profiles', null, obj => {
      obj.jsonData.sort(this.compareName);
      this.setState({ profiles: obj.jsonData });
    })
  }

  httpGetImages = () => {
    this.httpRequest('GET', 'images', null, obj => {
      obj.jsonData.sort(this.compareName);
      this.setState({ images: obj.jsonData });
    })
  }

  showStatus = () => {
    if (this.state.loading)
      return <LoadingView />;
    else if (this.state.error)
      return <ErrorView />;
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => <Redirect to="/containers" />} />
        <Route
          path="/containers"
          render={() => <ContainerPage
                          httpRequest={this.httpRequest}
                          httpGetHosts={this.httpGetHosts}
                          hosts={this.state.hosts}
                          httpGetContainers={this.httpGetContainers}
                          httpPutContainerState={this.httpPutContainerState}
                          containers={this.state.containers}
                          containerStates={this.props.containerStates}
                        />}
        />
        <Route
          path="/profiles"
          render={() => <ProfilePage
                          httpRequest={this.httpRequest}
                          httpGetProfiles={this.httpGetProfiles}
                          profiles={this.state.profiles}
                        />}
        />
        <Route
          path="/images"
          render={() => <ImagePage
                          httpRequest={this.httpRequest}
                          httpGetImages={this.httpGetImages}
                          images={this.state.images}
                          httpGetContainers={this.httpGetContainers}
                          containers={this.state.containers}
                        />}
        />
        <Route
          path="/hosts"
          render={() => <HostPage
                          httpRequest={this.httpRequest}
                          httpGetHosts={this.httpGetHosts}
                          hosts={this.state.hosts}
                        />}
        />
        <Route
          path="/monitoring"
          render={() => <div></div>}
        />
        <Route
          path="/logs"
          render={() => <div></div>}
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
