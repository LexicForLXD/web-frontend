import React, { Component } from "react";
import "../App.css";
import BackupScheduleEdit from "./BackupScheduleEdit.js";
import { Table, Button } from "react-bootstrap";
import queryString from "query-string";
import { Redirect } from "react-router-dom";

/**
 *  Backup destination detail view UI component
 */
class BackupScheduleShow extends Component {
  constructor(props) {
    super();
    this.state = {
      editView: false,
      authorizeView: false,
      notFound: false,
      backupSchedule: {
        id: "",
        name: "",
        description: "",
        destination: "",
        executionTime: "",
        type: "",
        containerId: [],
      },
      containerNames: []
    };
  }

  /** Gets called once component has mounted. Fetches backup destination. */
  componentDidMount() {
    this.httpGetBackupSchedule();
  }

  /**
   * Gets called when different backup destination is clicked on sidebar.
   * Fetches backup destination.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.httpGetBackupSchedule();
    }
  }


  /** Toggles edit view. */
  toggleEditView = () => {
    this.setState({ editView: !this.state.editView });
  };

  /** Fetches backup destination. */
  httpGetBackupSchedule = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest("GET", `schedules/${id}`, null, obj => {
      if (obj.httpStatus === 404) this.setState({ notFound: true });
      else if (obj.httpStatus === 200)
        this.setState({ notFound: false, backupSchedule: obj.jsonData });
    });
  };

  httpGetContainer = () => {
    this.state.backupSchedule.containerId.forEach(function(id){
        this.props.httpRequest("GET", `containers/${id}`, null, obj => {
            if (obj.httpStatus === 404) this.setState({ notFoundContainer: true });
            else if (obj.httpStatus === 200)
                this.setState({containerNames: this.state.containerNames.push(obj.jsonData)})
        });
    })

  };

  /** Deletes backup destination. */
  httpDeleteBackupSchedule = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest("DELETE", `schedules/${id}`, null, () => {
      this.props.httpGetBackupSchedules();
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
            from="/backup-schedules/show"
            exact
            to="/backup-schedules"
          />
        )}
        {this.state.notFound && <h6>Backup schedule not found!</h6>}
        {!this.state.notFound && (
          <div>
            <Table bordered responsive striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Destination</th>
                  <th>Containers</th>
                  <th>Type</th>
                  <th>Execution time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.backupSchedule.name}</td>
                  <td>{this.state.backupSchedule.description}</td>
                  <td>{this.state.backupSchedule.destination.name}</td>
                    <td>{this.state.backupSchedule.containerId.toString()}</td>
                  {/*<td>*/}
                      {/*{this.state.containerNames.forEach(function(container) {*/}
                          {/*<p>{container.name}</p>*/}
                      {/*})}*/}
                  {/*</td>*/}
                  {/*<td>{this.state.backupSchedule.containers}</td>*/}
                  <td>{this.state.backupSchedule.type}</td>
                  <td>{this.state.backupSchedule.executionTime}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              type="button"
              className="Button"
              onClick={() => this.toggleEditView()}
            >
              <i className="fa fa-edit" /> Edit Schedule
            </Button>

            <Button
              type="button"
              className="Button"
              onClick={() => this.httpDeleteBackupSchedule()}
            >
              <i className="fa fa-trash" /> Delete Schedule
            </Button>
          </div>
        )}
        {!this.state.notFound &&
          this.state.editView && (
            <BackupScheduleEdit
              backupSchedule={this.state.backupSchedule}
              httpGetBackupDestinations={this.props.httpGetBackupSchedules}
              httpRequest={this.props.httpRequest}
            />
          )}
      </div>
    );
  }
}

export default BackupScheduleShow;
