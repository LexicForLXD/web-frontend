import React, { Component } from 'react';
import './App.css';
import { Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super();
  }

  select = (key) => {
    this.props.setPage(key);
  }

  render() {
    return (
      <Nav bsStyle="tabs" activeKey={this.props.page} onSelect={this.select}>
        <LinkContainer to="/containers">
          <NavItem eventKey={'containers'}>
            <i className="fa fa-cube"></i> Containers
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/hosts">
          <NavItem eventKey={'hosts'}>
            <i className="fa fa-server"></i> Hosts
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/monitoring">
          <NavItem eventKey={'monitoring'}>
            <i className="fa fa-area-chart"></i> Monitoring
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/logs">
          <NavItem eventKey={'logs'}>
            <i className="fa fa-pencil"></i> Logs
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/backup">
          <NavItem eventKey={'backup'}>
            <i className="fa fa-hdd-o"></i> Backup
          </NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}

export default Navigation;
