import React, { Component } from "react";
import "../App.css";
import Sidebar from "../Layout/Sidebar.js";
import BackupScheduleOverview from "./BackupScheduleOverview.js";
import BackupScheduleCreate from "./BackupScheduleCreate.js";
// import BackupScheduleShow from './BackupScheduleShow.js';
import { Grid, Col } from "react-bootstrap";
import { Route } from "react-router-dom";
import queryString from "query-string";

/**
 *  BackupSchedule (top level) page component
 */
class BackupSchedulePage extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  /**
   * Gets called once component has mounted. Fetches containers.
   */
  componentDidMount() {
    this.props.httpGetBackupSchedules();
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
            parent="backup-schedules"
            refresh={this.props.httpGetBackupSchedules}
            overview
            create
            items={this.props.backupSchedules}
            icon={"fa fa-calendar"}
            select={this.select}
          />
        </Col>
        <Col xs={9} md={10}>
          <Route
            exact
            path="/backup-schedules"
            render={() => (
              <BackupScheduleOverview
                backupSchedules={this.props.backupSchedules}
              />
            )}
          />
          <Route
            path="/backup-schedules/create"
            render={() => (
              <BackupScheduleCreate
                httpGetBackupSchedules={this.props.httpGetBackupSchedules}
                backupSchedules={this.state.backupSchedules}
                httpRequest={this.props.httpRequest}
              />
            )}
          />
          {/* <Route
            path="/backup-schedules/show"
            render={() => <BackupScheduleShow
                            id={queryString.parse(window.location.search).id} // still needed?
                            httpGetBackupSchedules={this.props.httpGetBackupSchedules}
                            httpRequest={this.props.httpRequest}
                          />}
          /> */}
        </Col>
      </Grid>
    );
  }
}

export default BackupSchedulePage;
