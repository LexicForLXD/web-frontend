import React, { Component } from 'react';
import './App.css';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

/**
 * Navigation bar UI component
 */
class Navigation extends Component {
  constructor(props) {
    super();
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <Nav bsStyle="tabs">
        <LinkContainer to="/containers">
          <NavItem>
            <i className="fa fa-cube"></i> Containers
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/profiles">
          <NavItem>
            <i className="fa fa-gear"></i> Profiles
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/images">
          <NavItem>
            <i className="fa fa-camera"></i> Images
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/hosts">
          <NavItem>
            <i className="fa fa-server"></i> Hosts
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/monitoring">
          <NavItem>
            <i className="fa fa-area-chart"></i> Monitoring
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/logs">
          <NavItem>
            <i className="fa fa-pencil"></i> Logs
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/backups">
          <NavItem>
            <i className="fa fa-hdd-o"></i> Backups
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/backup-schedules">
          <NavItem>
            <i className="fa fa-calendar"></i> Backup Schedules
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/users">
          <NavItem>
            <i className="fa fa-user"></i> Users
          </NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}

export default Navigation;
