import React, { Component } from 'react';
import './App.css';
import HostPage from './HostPage.js';
import ContainerPage from './ContainerPage.js';
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
      hosts: []
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
      console.log('Request response: ', response);  // Remove in production
      if (response.status === 401) {
        this.props.logout();  // TODO try using refresh token before logging out
      };
      const contentType = response.headers.get("content-type");
      if(contentType && contentType.includes("application/json")) {
        return response.json();
      }
      return {};
    })
    .then(json => {
      console.log('Response body: ', json);  // Remove in production
      callbackFunction(json);
    })
    .then(() => {
      this.setState({
        loading: false,
        error: false
      });
    })
    .catch(error => {
      console.log('Request failed: ', error); // Remove in production
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
    this.httpRequest('GET', 'containers', null, json => {
      json.sort(this.compareName);
      this.setState({ containers: json });
      // if (this.state.containers instanceof Array) {
      //   this.state.containers.forEach(container => {
      //     this.httpGetContainerState(container.id);
      //   });
      // };
    });
  }

  httpGetContainerState = id => {
    this.httpRequest('GET', `containers/${id}/state`, null, json => {
      const containerStates = this.state.containerStates;
      containerStates[id] = json.metadata.status;
      this.setState({ containerStates: containerStates });
    });
  }

  httpPutContainerState = (id, action) => {
    const body = JSON.stringify({
      action: action
    });
    this.httpRequest('PUT', `containers/${id}/state`, body, () => {
      // this.httpGetContainerState(id);
    })
  }

  httpGetHosts = () => {
    this.httpRequest('GET', 'hosts', null, json => {
      json.sort(this.compareName);
      this.setState({ hosts: json });
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
