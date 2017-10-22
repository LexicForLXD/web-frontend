import React, { Component } from 'react';
import './App.css';
import { Nav, NavItem, Button } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super();
    this.state = {
      page: 1
    };
  }

  select = (key) => {
    this.setState({
      page: key
    });
    this.props.print(`${key} selected`);
  }

  render() {
    return (
      <div>
        <Nav bsStyle="pills" stacked activeKey={this.state.page} onSelect={this.select}>
          <NavItem eventKey={1}>Overview</NavItem>
          {this.props.containers.map((container, index) =>
            <NavItem key={index} eventKey={index + 2}>{container.name}</NavItem>
          )}
        </Nav>
        <Button type="btn" onClick={this.props.refresh}
                className="Refresh">Refresh</Button>
      </div>
    );
  }
}

export default Navigation;
