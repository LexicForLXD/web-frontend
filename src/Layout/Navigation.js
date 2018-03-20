import React, { Component } from "react";
import "../App.css";
import { Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

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
            <i className="fa fa-cube" /> Containers
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/profiles">
          <NavItem>
            <i className="fa fa-gear" /> Profiles
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/images">
          <NavItem>
            <i className="fa fa-camera" /> Images
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/hosts">
          <NavItem>
            <i className="fa fa-server" /> Hosts
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/monitoring">
          <NavItem>
            <i className="fa fa-area-chart" /> Monitoring
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/logs">
          <NavItem>
            <i className="fa fa-pencil" /> Logs
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/backups">
          <NavItem>
            <i className="fa fa-hdd-o" /> Backups
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/backup-schedules">
          <NavItem>
            <i className="fa fa-calendar" /> Backup Schedules
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/backup-destinations">
          <NavItem>
            <i className="fa fa-server" /> Backup Destinations
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/users">
          <NavItem>
            <i className="fa fa-user" /> Users
          </NavItem>
        </LinkContainer>
      </Nav>
    );
  }
}

export default Navigation;
