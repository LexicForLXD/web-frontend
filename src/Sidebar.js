import React, { Component } from 'react';
import './App.css';
import { Nav, NavItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

class Sidebar extends Component {
  constructor(props) {
    super();
  }

  mapItems = () =>
    this.props.items.map((item, index) =>
      // <NavItem key={index + 2} eventKey={index}>
      //   <i className={this.props.icon}></i> {item.name}
      // </NavItem>
      <LinkContainer to={`/${this.props.parent}/show?name=${item.name}`}>
        <NavItem key={index + 2} eventKey={index}>
          <i className={this.props.icon}></i> {item.name}
        </NavItem>
      </LinkContainer>
    );

  render() {
    return (
      <div>
        <Button type="button" className="RefreshBtn" onClick={() => this.props.refresh()}>
          <i className="fa fa-refresh"></i> Refresh
        </Button>
        <Nav stacked activeKey={this.props.selected} onSelect={this.props.select}>
          {this.props.overview &&
            <LinkContainer to={`/${this.props.parent}/overview`}>
              <NavItem eventKey={'overview'}>
                <i className="fa fa-desktop"></i> Overview
              </NavItem>
            </LinkContainer>
          }
          {this.props.create &&
            <LinkContainer to={`/${this.props.parent}/create`}>
              <NavItem eventKey={'create'}>
                <i className="fa fa-plus-square"></i> Create
              </NavItem>
            </LinkContainer>
          }
          {this.props.items instanceof Array && this.mapItems()}
        </Nav>
      </div>
    );
  }
}

export default Sidebar;
