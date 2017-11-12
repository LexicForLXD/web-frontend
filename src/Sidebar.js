import React, { Component } from 'react';
import './App.css';
import { Nav, NavItem, Button } from 'react-bootstrap';

class Sidebar extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: 'container overview'
    };
  }

  select = (key) => {
    this.setState({
      selected: key
    });
  }

  displayContainers = () =>
    this.props.containers.map((container, index) =>
      <NavItem key={index + 1} eventKey={`container ${index + 1}`}>
        <i className="fa fa-cube"></i> {container.name}
      </NavItem>
    );

  displayHosts = () =>
    this.props.hosts.map((host, index) =>
      <NavItem key={index} eventKey={`host ${index + 1}`}>
        <i className="fa fa-server"></i> {host.name}
      </NavItem>
    );

  switchPageItems = () => {
    switch (this.props.page) {
      case 'containers':
        return this.displayContainers()
      case 'hosts':
        return this.displayHosts()
      default: break;
    }
  }

  render() {
    return (
      <Nav stacked activeKey={this.state.selected} onSelect={this.select}>
        <Button type="button" className="Refresh" onClick={this.props.refresh}>
          <i className="fa fa-refresh"></i> Refresh
        </Button>
        <NavItem key={0} eventKey={'container overview'}>
          <i className="fa fa-desktop"></i> Overview
        </NavItem>
        {this.switchPageItems()}
      </Nav>
    );
  }
}

export default Sidebar;
