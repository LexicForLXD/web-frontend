import React, { Component } from "react";
import "../App.css";
import Sidebar from "../Layout/Sidebar.js";
import BackupDestinationOverview from "./BackupDestinationOverview.js";
import BackupDestinationCreate from "./BackupDestinationCreate.js";
import BackupDestinationShow from "./BackupDestinationShow.js";
import { Grid, Col } from "react-bootstrap";
import { Route } from "react-router-dom";
import queryString from "query-string";

/**
 *  BackupDestination (top level) page component
 */
class BackupDestinationPage extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  /**
   * Gets called once component has mounted. Fetches containers.
   */
  componentDidMount() {
    this.props.httpGetBackupDestinations();
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
            parent="backup-destinations"
            refresh={this.props.httpGetBackupDestinations}
            overview
            create
            items={this.props.backupDestinations}
            icon={"fa fa-calendar"}
            select={this.select}
          />
        </Col>
        <Col xs={9} md={10}>
          <Route
            exact
            path="/backup-destinations"
            render={() => (
              <BackupDestinationOverview
                backupDestinations={this.props.backupDestinations}
              />
            )}
          />
          <Route
            path="/backup-destinations/create"
            render={() => (
              <BackupDestinationCreate
                httpGetBackupDestinations={this.props.httpGetBackupDestinations}
                backupDestinations={this.state.backupDestinations}
                httpRequest={this.props.httpRequest}
              />
            )}
          />
          <Route
            path="/backup-destinations/show"
            render={() => (
              <BackupDestinationShow
                id={queryString.parse(window.location.search).id} // still needed?
                httpGetBackupDestinations={this.props.httpGetBackupDestinations}
                httpRequest={this.props.httpRequest}
              />
            )}
          />
        </Col>
      </Grid>
    );
  }
}

export default BackupDestinationPage;
