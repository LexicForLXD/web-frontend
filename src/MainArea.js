import React, { Component } from 'react';
import './App.css';
import HostPage from './HostPage.js';
import { Well, Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';

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

  showStatus = () => {
    if (this.state.loading)
      return <LoadingView />;
    else if (this.state.error)
      return <ErrorView />;
  }

  render() {
    return (
      <div>
        <Route
          path="/containers"
          render={() => <div></div>}
        />
        <Route
          path="/hosts"
          render={() => <HostPage
                          accessToken={this.props.accessToken}
                          hosts={this.state.hosts}
                          httpRequest={this.httpRequest}
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
