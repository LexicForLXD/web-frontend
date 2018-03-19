import React, { Component } from 'react';
import '../App.css';
import { Table } from 'react-bootstrap';

/**
 *  BackupSchedule overview UI component
 */
class BackupScheduleOverview extends Component {
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
            <th>Execution Time</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {this.props.backupSchedules instanceof Array &&
            this.props.backupSchedules.map(backupSchedule =>
              <tr key={backupSchedule.id}>
                <td>{backupSchedule.name}</td>
                <td>{backupSchedule.description}</td>
                <td>{backupSchedule.executionTime}</td>
                <td>{backupSchedule.type}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    )
  }
}

export default BackupScheduleOverview;
