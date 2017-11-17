import React, { Component } from 'react';
import './App.css';
import Containers from './Containers.js';
import Hosts from './Hosts.js';
import { Well } from 'react-bootstrap';

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
      url: 'http://127.0.0.1:8000/',  // Replace in production
      loading: false,
      error: false,
      containers: [],
      hosts: []
    };
  }

  componentDidMount() {
    this.refresh();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page !== nextProps.page) {
      this.refresh(nextProps.page);
    }
  }

  refresh = (page = this.props.page) => {
    switch (page) {
      case 'containers':
        this.httpGetContainers();
        break;
      case 'hosts':
        this.httpGetHosts();
        break;
      default: break;
    }
  }

  httpGetContainers = () => {
    this.setState({
      loading: true
    });
    this.setState({
      containers: [  // To be replaced with a fetch()-from-api method call
        {
          name: "Container 1",
          ip: "10.16.18.20",
          status: "running"
        },
        {
          name: "Container 2",
          ip: "10.16.18.21",
          status: "stopped"
        },
        {
          name: "Container 3",
          ip: "10.16.18.22",
          status: "running"
        }
      ],
      loading: false,
      error: false
    })
  }

  httpGet = (path, processData) => {
    this.setState({
      loading: true
    });
    fetch(this.state.url + path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.accessToken}`
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log('Request response: ', json); // Remove in production
      this.setState({
        loading: false,
        error: false
      });
      return json;
    })
    .then(json => processData(json))
    .catch(error => {
      console.log('Request failed: ', error); // Remove in production
      this.setState({
        loading: false,
        error: true
      });
    });
  }

  httpGetHosts = () => {
    this.httpGet('hosts', json => {
      this.setState({
        hosts: json
      })
    })
  }

  showStatus = () => {
    if (this.state.loading)
      return <LoadingView />;
    else if (this.state.error)
      return <ErrorView />;
  }

  showPage = () => {
    switch (this.props.page) {
      case 'containers':
        return <Containers
                  accessToken={this.props.accessToken}
                  refresh={this.refresh}
                  containers={this.state.containers}
                />;
      case 'hosts':
      return <Hosts
                accessToken={this.props.accessToken}
                refresh={this.refresh}
                hosts={this.state.hosts}
              />;
      default:
        return <div></div>
    }
  }

  render() {
    return (
      <div>
        {this.showStatus()}
        {this.showPage()}
      </div>
    )
  }
}

export default MainArea;
