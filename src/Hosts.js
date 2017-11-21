import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import HostOverview from './HostOverview.js';
import HostCreate from './HostCreate.js';
import Host from './Host.js';
import { Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

class Hosts extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: 'overview'
    };
  }

  componentDidMount() {
    this.props.refresh();
  }

  select = (key) => {
    this.setState({
      selected: key
    });
  }

  showItem = () => {
    switch (this.state.selected) {
      case 'overview':
        return <HostOverview hosts={this.props.hosts} />;
      case 'create':
        return <HostCreate
                 accessToken={this.props.accessToken}
                 refresh={this.props.refresh}
                 httpRequest={this.props.httpRequest}
                 goBack={() => this.select('overview')}
               />;
      default:
        return <Host
                 host={this.props.hosts[this.state.selected]}
                 refresh={this.props.refresh}
                 httpRequest={this.props.httpRequest}
                 goBack={() => this.select('overview')}
               />;
    }
  }

  render() {
    return (
      <Grid>
        <Col xs={3} md={2}>
          <Sidebar
            parent="hosts"
            refresh={this.props.refresh}
            overview
            create
            items={this.props.hosts}
            icon={'fa fa-server'}
            select={this.select}
          />
        </Col>
        <Col xs={9} md={10}>
          {/* {this.showItem()} */}
          <Route
            path="/hosts/overview"
            render={() => <HostOverview hosts={this.props.hosts} />}
          />
          <Route
            path="/hosts/create"
            render={() => <HostCreate
                            accessToken={this.props.accessToken}
                            refresh={this.props.refresh}
                            httpRequest={this.props.httpRequest}
                            goBack={() => this.select('overview')}
                          />}
          />
          <Route
            path="/hosts/show"
            render={() => <Host
                            // host={this.props.hosts[this.state.selected]}
                            host={this.props.hosts.find(host => host.name === queryString.parse(window.location.search).name)}
                            refresh={this.props.refresh}
                            httpRequest={this.props.httpRequest}
                            goBack={() => this.select('overview')}
                          />}
          />
        </Col>
      </Grid>
    )
  }
}

export default Hosts;
