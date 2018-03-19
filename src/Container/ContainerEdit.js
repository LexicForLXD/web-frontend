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
import Select from "react-select";
import Toggle from "react-bootstrap-toggle";
import ErrorMessage from "../ErrorMessage.js";
const JSON5 = require("json5");

/**
 * UI component for editing container
 */
class ContainerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      name: this.props.container.name,
      profiles: this.props.container.settings.profiles,
      ephemeral: this.props.container.settings.ephemeral,
      config: this.props.container.settings.config
        ? this.props.container.settings.config
        : "",
      devices: this.props.container.settings.devices
        ? this.props.container.settings.devices
        : ""
    };
  }

  /** Gets called once component has mounted. Fetches profiles. */
  componentDidMount() {
    this.props.httpGetProfiles();
  }

  /** Form change handler */
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  /** Profiles multi-select change handler */
  handleProfilesChange = selection => {
    this.setState({ profiles: selection.map(option => option.value) });
  };

  /** Toggle button change handler */
  toggleEphemeral = () => {
    const ephemeral = !this.state.ephemeral;
    this.setState({ ephemeral: ephemeral });
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

  /** Return key press handler - calls submit() */
  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0) {
      this.submit();
    }
  };

  /** Puts container on form submit */
  submit = () => {
    this.httpPutContainer();
  };

  /** Puts edited container */
  httpPutContainer = () => {
    let body = {
      name: this.state.name,
      ephemeral: this.state.ephemeral,
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
        this.props.httpGetContainers();
        this.setState({ redirect: true });
      }
    };
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest("PUT", "containers/" + id, body, callbackFunction);
  };

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && (
          <Redirect from="/containers/edit" exact to="/containers" />
        )}
        <FormGroup controlId="formName">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name}
            placeholder="Enter name"
            onChange={this.handleNameChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>
            {this.state.name.length < 1 && "Please enter a name"}
          </HelpBlock>
        </FormGroup>
        <ControlLabel>Profiles</ControlLabel>
        <Select
          multi
          closeOnSelect={false} // is this default?
          name="formProfiles"
          value={this.state.profiles}
          onChange={this.handleProfilesChange}
          options={this.props.profiles.map(profile => {
            return { value: profile.id, label: profile.name };
          })}
        />
        <ControlLabel>Ephemeral</ControlLabel>
        <br />
        <Toggle
          onClick={this.toggleEphemeral}
          on={<b>True</b>}
          off={<b>False</b>}
          size="md"
          onstyle="success"
          offstyle="info"
          active={this.state.ephemeral}
          className="ToggleBtn"
          style={{ marginTop: "5px" }}
        />
        <FormGroup controlId="formConfig">
          <ControlLabel className="ControlLabel">Config</ControlLabel>
          <FormControl
            componentClass="textarea"
            rows={20}
            defaultValue={JSON.stringify(this.state.config, null, 2)}
            value={this.state.config.value}
            placeholder="Enter optional config JSON object"
            onChange={this.handleConfigChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formDevices">
          <ControlLabel className="ControlLabel">Devices</ControlLabel>
          <FormControl
            componentClass="textarea"
            rows={20}
            defaultValue={JSON.stringify(this.state.devices, null, 2)}
            value={this.state.devices.value}
            placeholder="Enter optional devices JSON object"
            onChange={this.handleDevicesChange}
            onKeyDown={this.handleKeyPress}
          />
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

export default ContainerEdit;
