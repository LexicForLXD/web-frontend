import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

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

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  }

  handleConfigChange = e => {
    const config = e.target.value;
    const error = !config || this.isJsonString(config) ?
      null : 'Not a valid JSON String';
    this.setState({
      config: config,
      errorConfig: error
    });
  }

  handleDevicesChange = e => {
    const devices = e.target.value;
    const error = !devices || this.isJsonString(devices) ?
      null : 'Not a valid JSON String';
    this.setState({
      devices: devices,
      errorDevices: error
    });
  }

  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0) {
      this.submit();
    }
  }

  isJsonString = str => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  submit = () => {
    this.httpPostProfile();
  }

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
          errorDomainDevices: obj.jsonData.errors.devices
        });
      } else {
        this.props.httpGetProfiles();
        this.setState({ redirect: true });
      }
    }
    this.props.httpRequest('POST', 'profiles', body, callbackFunction);
  }

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
            placeholder="Enter optional config JSON string"
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
            placeholder="Enter optional devices JSON string"
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
