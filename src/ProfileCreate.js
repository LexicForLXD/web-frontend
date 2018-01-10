import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
const JSON5 = require('json5');

/**
 * UI component for creating a new host
 */
class ProfileCreate extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      description: '',
      config: '',  // JSON object as string
      devices: ''  // JSON object as string
    };
  }

  /** Form change handler */
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  /** Form change handler */
  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  }

  /** Form change handler */
  handleConfigChange = event => {
    try {
      const config = JSON5.parse(event.target.value);  // using JSON5 to accept keys without quotes
      this.setState({
        config: config,
        errorConfig: null
      });
    } catch (exception) {
      this.setState({
        config: '',
        errorConfig: 'Not a valid JSON object'
      });
    }
  }

  /** Form change handler */
  handleDevicesChange = event => {
    try {
      const devices = JSON5.parse(event.target.value);  // using JSON5 to accept keys without quotes
      this.setState({
        devices: devices,
        errorDevices: null
      });
    } catch (exception) {
      this.setState({
        devices: '',
        errorDevices: 'Not a valid JSON object'
      });
    }
  }

  /** Return key press handler - calls submit()*/
  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0) {
      this.submit();
    }
  }

  /** Posts profile on form submit */
  submit = () => {
    this.httpPostProfile();
  }

  /** Posts profile */
  httpPostProfile = () => {
    const body = JSON.stringify({
      name: this.state.name,
      description: this.state.description,
      config: this.state.config,
      devices: this.state.devices
    });
    const callbackFunction = obj => {
      if (obj.jsonData.errors) {
        this.setState({
          errorName: obj.jsonData.errors.name,
          errorDescription: obj.jsonData.errors.description,
          errorConfig: obj.jsonData.errors.config,
          errorDevices: obj.jsonData.errors.devices
        });
      } else {
        this.props.httpGetProfiles();
        this.setState({ redirect: true });
      }
    }
    this.props.httpRequest('POST', 'profiles', body, callbackFunction);
    // console.log('body', body);
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/profiles/create" exact to="/profiles" />}
        <FormGroup controlId="formName" validationState={this.state.errorName ? 'error' : null}>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name.value}
            placeholder="Enter name"
            onChange={this.handleNameChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorName || (this.state.name.length < 1 && 'Please enter a name')}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formDescription" validationState={this.state.errorDescription ? 'error' : null}>
          <ControlLabel className="ControlLabel">Description</ControlLabel>
          <FormControl
            type='text'
            value={this.state.description.value}
            placeholder="Enter description"
            onChange={this.handleDescriptionChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorDescription}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formConfig" validationState={this.state.errorConfig ? 'error' : null}>
          <ControlLabel className="ControlLabel">Config</ControlLabel>
          <FormControl
            componentClass="textarea"
            rows={20}
            value={this.state.config.value}
            placeholder="Enter optional config JSON object"
            onChange={this.handleConfigChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorConfig}</HelpBlock>
        </FormGroup>

        <FormGroup controlId="formDevices" validationState={this.state.errorDevices ? 'error' : null}>
          <ControlLabel className="ControlLabel">Devices</ControlLabel>
          <FormControl
            componentClass="textarea"
            rows={20}
            value={this.state.devices.value}
            placeholder="Enter optional devices JSON object"
            onChange={this.handleDevicesChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorDevices}</HelpBlock>
        </FormGroup>
        <Button
          type="button"
          disabled={this.state.name.length < 1 ||
                    this.state.errorConfig ||
                    this.state.errorDevices}
          onClick={this.submit}
        >
          Submit
        </Button>
      </form>
    )
  }
}

export default ProfileCreate;
