import React, { Component } from "react";
import "../App.css";
import { Table } from "react-bootstrap";

/**
 *  Backup overview UI component
 */
class BackupOverview extends Component {
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
            <th>Timestamp</th>
            <th>Destination ID</th>
            <th>Container ID</th>
          </tr>
        </thead>
        <tbody>
          {this.props.backups instanceof Array &&
            this.props.backups.map(backup => (
              <tr key={backup.id}>
                <td>{backup.timestamp}</td>
                <td>{backup.destinationId}</td>
                <td>{backup.containerId}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  }
}

export default BackupOverview;
