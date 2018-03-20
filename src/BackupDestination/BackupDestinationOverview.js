import React, { Component } from "react";
import "../App.css";
import { Table } from "react-bootstrap";

/**
 *  BackupDestination overview UI component
 */
class BackupDestinationOverview extends Component {
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
            <th>Protocol</th>
            <th>Username</th>
            <th>Hostname</th>
            <th>Path</th>
          </tr>
        </thead>
        <tbody>
          {this.props.backupDestinations instanceof Array &&
            this.props.backupDestinations.map(backupDestination => (
              <tr key={backupDestination.id}>
                <td>{backupDestination.name}</td>
                <td>{backupDestination.description}</td>
                <td>{backupDestination.protocol}</td>
                <td>{backupDestination.username}</td>
                <td>{backupDestination.hostname}</td>
                <td>{backupDestination.path}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  }
}

export default BackupDestinationOverview;
