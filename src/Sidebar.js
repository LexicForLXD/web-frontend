import React, { Component } from 'react';
import './App.css';
import { Nav, NavItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Sidebar extends Component {
  constructor(props) {
    super();
  }

  mapItems = () =>
    this.props.items.map((item, index) =>
      <LinkContainer to={`/${this.props.parent}/show?id=${item.id}`} key={index}>
        <NavItem>
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
              <NavItem>
                <i className="fa fa-desktop"></i> Overview
              </NavItem>
            </LinkContainer>
          }
          {this.props.create &&
            <LinkContainer to={`/${this.props.parent}/create`}>
              <NavItem>
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
