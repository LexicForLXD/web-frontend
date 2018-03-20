import React, { Component } from "react";
import "../App.css";
import {
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import ErrorMessage from "../ErrorMessage.js";
import Select from "react-select";

/**
 * UI component for creating a new backupDestination
 */
class BackupDestinationCreate extends Component {
  /**
   * @param {props} props from BackupDestinationPage
   */
  constructor(props) {
    super();
    this.state = {
      name: "",
      description: "",
      protocol: "",
      username: "",
      password: "",
      hostname: "",
      path: ""
    };
  }

  /** Form name change handler */
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  /** Form description change handler */
  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  /** Form protocol select change handler */
  handleProtocolChange = selection => {
    this.setState({ protocol: selection.value });
  };

  /** Form username change handler */
  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  /** Form password change handler */
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  /** Form hostname change handler */
  handleHostnameChange = e => {
    this.setState({ hostname: e.target.value });
  };

  /** Form path change handler */
  handlePathChange = e => {
    this.setState({ path: e.target.value });
  };

  /** Return key press handler - calls submit() */
  handleKeyPress = e => {
    if (e.keyCode === 13) {
      this.submit();
    }
  };

  /** Posts backupDestination on form submit */
  submit = () => {
    this.httpPostBackupDestination();
  };

  /** Posts backupDestination */
  httpPostBackupDestination = () => {
    let body = {
      name: this.state.name,
      description: this.state.description,
      protocol: this.state.protocol,
      username: this.state.username,
      password: this.state.password,
      hostname: this.state.hostname,
      path: this.state.path
    };
    Object.keys(body).forEach(
      key =>
        (body[key] === null || body[key] === undefined || body[key].length) ===
          0 && delete body[key]
    );
    body = JSON.stringify(body);
    const callbackFunction = obj => {
      if (obj.error) {
        this.setState({
          error: obj.error.message
        });
      } else {
        this.props.httpGetBackupDestinations();
        this.setState({ redirect: true });
      }
    };
    this.props.httpRequest(
      "POST",
      "backupdestinations",
      body,
      callbackFunction
    );
  };

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && (
          <Redirect
            from="/backup-destinations/create"
            exact
            to="/backup-destinations"
          />
        )}
        <FormGroup controlId="formName">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name.value}
            placeholder="Enter name"
            onChange={this.handleNameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formDescription">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            type="text"
            value={this.state.description.value}
            placeholder="Enter description"
            onChange={this.handleDescriptionChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formProtocol">
          <ControlLabel>Protocol</ControlLabel>
          <Select
            name="formProtocol"
            value={this.state.protocol}
            onChange={this.handleProtocolChange}
            options={[
              { value: "scp", label: "scp" },
              { value: "ftp", label: "ftp" },
              { value: "sftp", label: "sftp" },
              { value: "file", label: "file" },
              { value: "imap", label: "imap" },
              { value: "imaps", label: "imaps" },
              { value: "rsync", label: "rsync" },
              { value: "cf+http", label: "cf+http" },
              { value: "http", label: "http" },
              { value: "https", label: "https" },
              { value: "s3", label: "s3" },
              { value: "s3+http", label: "s3+http" },
              { value: "u1", label: "u1" },
              { value: "u1+http", label: "u1+http" },
              { value: "tahoe", label: "tahoe" },
              { value: "webdav", label: "webdav" },
              { value: "webdavs", label: "webdavs" },
              { value: "gdocs", label: "gdocs" }
            ]}
          />
        </FormGroup>
        <FormGroup controlId="formHostname">
          <ControlLabel>Hostname</ControlLabel>
          <FormControl
            type="text"
            value={this.state.hostname.value}
            placeholder="example.com or 192.168.1.50"
            onChange={this.handleHostnameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formPath">
          <ControlLabel>Path</ControlLabel>
          <FormControl
            type="text"
            value={this.state.path.value}
            placeholder="path/to/backup-folder"
            onChange={this.handlePathChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formUsername">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username.value}
            placeholder="Enter username"
            onChange={this.handleUsernameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formPassword">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password.value}
            placeholder="Enter password"
            onChange={this.handlePasswordChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <Button type="button" onClick={this.submit}>
          Submit
        </Button>
        <ErrorMessage message={this.state.error} />
      </form>
    );
  }
}

export default BackupDestinationCreate;
