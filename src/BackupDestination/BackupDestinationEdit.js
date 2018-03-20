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
import queryString from "query-string";
import ErrorMessage from "../ErrorMessage.js";
import Select from "react-select";

/**
 * UI component for editing host
 */
class BackupDestinationEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.backupDestination.name,
      description: this.props.backupDestination.description,
      protocol: this.props.backupDestination.protocol,
      username: this.props.backupDestination.username,
      password: "",
      hostname: this.props.backupDestination.hostname,
      path: this.props.backupDestination.path,
      error: null
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

  /** Puts backup destination on form submit */
  submit = () => {
    this.httpPutBackupDestination();
  };

  /** Puts backup destination */
  httpPutBackupDestination = () => {
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
        (body[key] === undefined || body[key].length === 0) && delete body[key]
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
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest(
      "PUT",
      "backupdestinations/" + id,
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
            from="/backup-destinations/edit"
            exact
            to="/backup-destinations"
          />
        )}
        <FormGroup controlId="formName">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.name}
            value={this.state.name ? this.state.name.value : ""}
            placeholder="Enter name"
            onChange={this.handleNameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formDescription">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.description}
            value={this.state.description ? this.state.description.value : ""}
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
            defaultValue={this.state.hostname}
            value={this.state.hostname ? this.state.hostname.value : ""}
            placeholder="example.com or 192.168.1.50"
            onChange={this.handleHostnameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formPath">
          <ControlLabel>Path</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.path}
            value={this.state.path ? this.state.path.value : ""}
            placeholder="path/to/backup-folder"
            onChange={this.handlePathChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formUsername">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.username}
            value={this.state.username ? this.state.username.value : ""}
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
            placeholder="Only fill in if you want to change"
            onChange={this.handlePasswordChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <Button
          type="button"
          disabled={this.state.name.length < 1}
          onClick={this.submit}
        >
          Submit
        </Button>
        <ErrorMessage message={this.state.error} />
      </form>
    );
  }
}

export default BackupDestinationEdit;
