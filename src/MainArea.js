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
      loading: false,
      error: false,
      containers: [],
      hosts: []
    };
  }

  componentDidMount() {
    this.refresh(this.props.page);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page !== nextProps.page) {
      this.refresh(nextProps.page);
    }
  }

  refresh = (page) => {
    switch (page) {
      case 'containers':
        this.fetchContainers();
        break;
      case 'hosts':
        this.fetchHosts();
        break;
      default: break;
    }
  }

  fetchContainers = () => {
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

  fetchHosts = () => {
    this.setState({
      loading: true
    });
    this.setState({
      hosts: [  // To be replaced with a fetch()-from-api method call
        {
          name: "Host 1",
          ip: "10.16.12.20",
          status: "online"
        },
        {
          name: "Host 2",
          ip: "10.16.12.21",
          status: "offline"
        },
        {
          name: "Host 2",
          ip: "10.16.18.22",
          status: "offline"
        }
      ],
      loading: false,
      error: false
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
                  refresh={this.refresh}
                  containers={this.state.containers}
                />;
      case 'hosts':
      return <Hosts
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
