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
const JSON5 = require("json5");

/**
 * UI component for creating a new host
 */
class ProfileCreate extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      description: "",
      config: "", // JSON object as string
      devices: {
        root: {
          path: "/",
          type: "disk",
          pool: "default"
        }
      },
      error: null
    };
  }

  /** Form change handler */
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  /** Form change handler */
  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  /** Form change handler */
  handleConfigChange = event => {
    if (event.target.value === "") {
      this.setState({
        config: "",
        errorConfig: null
      });
      return;
    }
    try {
      const config = JSON5.parse(event.target.value); // using JSON5 to accept keys without quotes
      this.setState({
        config: config,
        errorConfig: null
      });
    } catch (exception) {
      this.setState({
        config: "",
        errorConfig: "Not a valid JSON object"
      });
    }
  };

  /** Form change handler */
  handleDevicesChange = event => {
    if (event.target.value === "") {
      this.setState({
        devices: "",
        errorDevices: null
      });
      return;
    }
    try {
      const devices = JSON5.parse(event.target.value); // using JSON5 to accept keys without quotes
      this.setState({
        devices: devices,
        errorDevices: null
      });
    } catch (exception) {
      this.setState({
        devices: "",
        errorDevices: "Not a valid JSON object"
      });
    }
  };

  /** Posts profile on form submit */
  submit = () => {
    this.httpPostProfile();
  };

  /** Posts profile */
  httpPostProfile = () => {
    let body = {
      name: this.state.name,
      description: this.state.description,
      config: this.state.config,
      devices: this.state.devices
    };
    Object.keys(body).forEach(
      key =>
        (body[key] === null ||
          body[key] === undefined ||
          body[key].length === 0) &&
        delete body[key]
    );
    body = JSON.stringify(body);
    const callbackFunction = obj => {
      if (obj.error) {
        this.setState({
          error: obj.error.message
        });
      } else {
        this.props.httpGetProfiles();
        this.setState({
          error: null,
          redirect: true
        });
      }
    };
    this.props.httpRequest("POST", "profiles", body, callbackFunction);
  };

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && (
          <Redirect from="/profiles/create" exact to="/profiles" />
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
          <HelpBlock>
            {this.state.name.length < 1 && "Please enter a name"}
          </HelpBlock>
        </FormGroup>
        <FormGroup controlId="formDescription">
          <ControlLabel className="ControlLabel">Description</ControlLabel>
          <FormControl
            type="text"
            value={this.state.description.value}
            placeholder="Enter description"
            onChange={this.handleDescriptionChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formConfig">
          <ControlLabel className="ControlLabel">Config</ControlLabel>
          <FormControl
            componentClass="textarea"
            rows={10}
            value={this.state.config.value}
            placeholder="Enter optional config JSON object"
            onChange={this.handleConfigChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorConfig}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formDevices">
          <ControlLabel className="ControlLabel">Devices</ControlLabel>
          <FormControl
            componentClass="textarea"
            rows={10}
            value={this.state.devices.value}
            defaultValue={JSON.stringify(this.state.devices, null, 2)}
            placeholder="Enter optional devices JSON object"
            onChange={this.handleDevicesChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorDevices}</HelpBlock>
        </FormGroup>
        <Button
          type="button"
          disabled={
            this.state.name.length < 1 ||
            this.state.errorConfig ||
            this.state.errorDevices
          }
          onClick={this.submit}
        >
          Submit
        </Button>
        <ErrorMessage message={this.state.error} />
      </form>
    );
  }
}

export default ProfileCreate;
