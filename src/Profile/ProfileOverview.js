import React, { Component } from "react";
import "../App.css";
import { Table } from "react-bootstrap";

/**
 *  Profile overview UI component
 */
class ProfileOverview extends Component {
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
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {this.props.profiles instanceof Array &&
            this.props.profiles.map(profile => (
              <tr key={profile.id}>
                <td>{profile.name}</td>
                <td>{profile.description}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  }
}

export default ProfileOverview;
