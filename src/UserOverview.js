import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';

/**
 *  User overview UI component
 */
class UserOverview extends Component {
  constructor(props) {
    super();
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <Table bordered responsive striped>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>E-Mail</th>
            <th>Roles</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {this.props.users instanceof Array &&
            this.props.users.map(user =>
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.roles.join(', ')}</td>
                <td style={user.isActive ? { 'color': 'green' } : { 'color': 'red' }}>
                  {user.isActive ? '\u2713' : '\u2715'}
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    )
  }
}

export default UserOverview;
