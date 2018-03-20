import React, { Component } from "react";
import "../App.css";
// import BackupDestinationEdit from "./BackupDestinationEdit.js";
import { Table, Button } from "react-bootstrap";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import BackupDestinationEdit from "./BackupDestinationEdit";

/**
 *  Backup destination detail view UI component
 */
class BackupDestinationShow extends Component {
  constructor(props) {
    super();
    this.state = {
      editView: false,
      authorizeView: false,
      notFound: false,
      backupDestination: {
        id: "",
        name: "",
        description: "",
        protocol: "",
        username: "",
        hostname: "",
        path: ""
      }
    };
  }

  /** Gets called once component has mounted. Fetches backup destination. */
  componentDidMount() {
    this.httpGetBackupDestination();
  }

  /**
   * Gets called when different backup destination is clicked on sidebar.
   * Fetches backup destination.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.httpGetBackupDestination();
    }
  }

  /** Toggles edit view. */
  toggleEditView = () => {
    this.setState({ editView: !this.state.editView });
  };

  /** Fetches backup destination. */
  httpGetBackupDestination = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest("GET", `backupdestinations/${id}`, null, obj => {
      if (obj.httpStatus === 404) this.setState({ notFound: true });
      else if (obj.httpStatus === 200)
        this.setState({ notFound: false, backupDestination: obj.jsonData });
    });
  };

  /** Deletes backup destination. */
  httpDeleteBackupDestination = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest("DELETE", `backupdestinations/${id}`, null, () => {
      this.props.httpGetBackupDestinations();
      this.setState({ redirect: true });
    });
  };

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <div>
        {this.state.redirect && (
          <Redirect
            from="/backup-destinations/show"
            exact
            to="/backup-destinations"
          />
        )}
        {this.state.notFound && <h6>Backup destination not found!</h6>}
        {!this.state.notFound && (
          <div>
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
                <tr>
                  <td>{this.state.backupDestination.name}</td>
                  <td>{this.state.backupDestination.description}</td>
                  <td>{this.state.backupDestination.protocol}</td>
                  <td>{this.state.backupDestination.username}</td>
                  <td>{this.state.backupDestination.hostname}</td>
                  <td>{this.state.backupDestination.path}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              type="button"
              className="Button"
              onClick={() => this.toggleEditView()}
            >
              <i className="fa fa-edit" /> Edit Destination
            </Button>

            <Button
              type="button"
              className="Button"
              onClick={() => this.httpDeleteBackupDestination()}
            >
              <i className="fa fa-trash" /> Delete Destination
            </Button>
          </div>
        )}
        {!this.state.notFound &&
          this.state.editView && (
            <BackupDestinationEdit
              backupDestination={this.state.backupDestination}
              httpGetBackupDestinations={this.props.httpGetBackupDestinations}
              httpRequest={this.props.httpRequest}
            />
          )}
      </div>
    );
  }
}

export default BackupDestinationShow;
