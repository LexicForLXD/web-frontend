import React, { Component } from 'react';
import './App.css';
import { Navbar, NavDropdown, Nav, NavItem, Button } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super();
    this.state = {
      page: 'containers'
    };
  }

  select = (key) => {
    this.setState({
      page: key
    });
    this.props.print(`Navigation: ${key} selected`);
  }

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            {/* <Navbar.Brand>
              <a href="#">LXD</a>
            </Navbar.Brand> */}
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav activeKey={this.state.page} onSelect={this.select}>
              {/* <NavItem eventKey={'overview'}>
                <i className="fa fa-desktop"></i> Overview
              </NavItem> */}
              <NavItem eventKey={'containers'}>
                <i className="fa fa-cube"></i> Containers
              </NavItem>
              <NavItem eventKey={'hosts'}>
                <i className="fa fa-server"></i> Hosts
              </NavItem>
              {/* <NavDropdown eventKey={'containers'} title="Containers" id="basic-nav-dropdown">
                {this.props.containers.map((container, index) =>
                  <NavItem key={index} eventKey={`container ${index + 1}`}>
                    <i className="fa fa-cube"></i> {container.name}
                  </NavItem>
                )}
              </NavDropdown> */}
              {/* <NavDropdown eventKey={'hosts'} title="Hosts" id="basic-nav-dropdown">
                {this.props.hosts.map((host, index) =>
                  <NavItem key={index} eventKey={`host ${index + 1}`}>
                    <i className="fa fa-server"></i> {host.name}
                  </NavItem>
                )}
              </NavDropdown> */}
              <NavItem eventKey={'monitoring'}>
                <i className="fa fa-area-chart"></i> Monitoring
              </NavItem>
              <NavItem eventKey={'log'}>
                <i className="fa fa-pencil"></i> Log
              </NavItem>
              <NavItem eventKey={'backup'}>
                <i className="fa fa-hdd-o"></i> Backup
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
