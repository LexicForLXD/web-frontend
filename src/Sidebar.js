import React, { Component } from 'react';
import './App.css';
import { Nav, NavItem, Button } from 'react-bootstrap';

class Sidebar extends Component {
  constructor(props) {
    super();
  }

  mapItems = () =>
    this.props.items.map((item, index) =>
      <NavItem key={index + 2} eventKey={`item ${index + 1}`}>
        <i className={this.props.icon}></i> {item.name}
      </NavItem>
    );

  render() {
    return (
      <div>
        <Button type="button" className="Refresh" onClick={this.props.refresh}>
          <i className="fa fa-refresh"></i> Refresh
        </Button>
        <Nav stacked activeKey={this.props.selected} onSelect={this.props.select}>
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
          {this.props.items instanceof Array && this.mapItems()}
        </Nav>
      </div>
    );
  }
}

export default Sidebar;
