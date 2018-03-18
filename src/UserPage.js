import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import UserOverview from './UserOverview.js';
import UserCreate from './UserCreate.js';
import UserShow from './UserShow.js';
import { Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

/**
 *  User (top level) page component
 */
class UserPage extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  /**
   * Gets called once component has mounted. Fetches containers.
   */
  componentDidMount() {
    this.httpGetUsers();
  }

  /** Gets users */
  httpGetUsers = () => {
    this.props.httpRequest('GET', 'users', null, obj => {
      if (obj.httpStatus !== 200) return;
      // obj.jsonData.sort(this.compareName);
      this.setState({ users: obj.jsonData });
    })
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <Grid>
        <Col xs={3} md={2}>
          <Sidebar
            parent="users"
            refresh={this.state.httpGetUsers}
            overview
            create
            items={this.state.users && this.state.users.map(user => {
              return { id: user.id, name: user.username }
            })}
            icon={'fa fa-user'}
            select={this.select}
          />
        </Col>
        <Col xs={9} md={10}>
          <Route
            exact path="/users"
            render={() => <UserOverview users={this.state.users} />}
          />
          <Route
            path="/users/create"
            render={() => <UserCreate
                            httpGetUsers={this.props.httpGetUsers}
                            users={this.state.users}
                            httpRequest={this.props.httpRequest}
                          />}
          />
          <Route
            path="/users/show"
            render={() => <UserShow
                            id={queryString.parse(window.location.search).id} // still needed?
                            httpGetUsers={this.props.httpGetUsers}
                            httpRequest={this.props.httpRequest}
                          />}
          />
        </Col>
      </Grid>
    )
  }
}

export default UserPage;
