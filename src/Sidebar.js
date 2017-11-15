import React, { Component } from 'react';
import './App.css';
import { Nav, NavItem, Button } from 'react-bootstrap';

class Sidebar extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: 'overview'
    };
  }

  select = (key) => {
    this.setState({
      selected: key
    });
  }

  // mapContainers = () =>
  //   this.props.containers.map((container, index) =>
  //     <NavItem key={index + 1} eventKey={`container ${index + 1}`}>
  //       <i className="fa fa-cube"></i> {container.name}
  //     </NavItem>
  //   );
  //
  // mapHosts = () =>
  //   this.props.hosts.map((host, index) =>
  //     <NavItem key={index} eventKey={`host ${index + 1}`}>
  //       <i className="fa fa-server"></i> {host.name}
  //     </NavItem>
  //   );

  mapItems = () =>
    this.props.items.map((item, index) =>
      <NavItem key={index + 2} eventKey={`item ${index + 1}`}>
        <i className={this.props.icon}></i> {item.name}
      </NavItem>
    );

  // addItems = () => {
  //   switch (this.props.page) {
  //     case 'containers':
  //       return this.mapContainers()
  //     case 'hosts':
  //       return this.mapHosts()
  //     default: break;
  //   }
  // }

  render() {
    return (
      <div>
        <Button type="button" className="Refresh" onClick={this.props.refresh}>
          <i className="fa fa-refresh"></i> Refresh
        </Button>
        <Nav stacked activeKey={this.state.selected} onSelect={this.select}>
          {this.props.overview &&
            <NavItem key={0} eventKey={'overview'}>
              <i className="fa fa-desktop"></i> Overview
            </NavItem>
          }
          {this.props.create &&
            <NavItem key={1} eventKey={'create'}>
              <i className="fa fa-plus-square"></i> Create
            </NavItem>
          }
          {this.mapItems()}
        </Nav>
      </div>
    );
  }
}

export default Sidebar;
