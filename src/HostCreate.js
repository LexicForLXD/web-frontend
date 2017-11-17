import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class HostCreate extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      ipv4: '',
      ipv6: '',
      mac: '',
      settings: ''
    };
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  handleIpv4Change = e => {
    this.setState({ ipv4: e.target.value });
  }

  handleIpv6Change = e => {
    this.setState({ ipv6: e.target.value });
  }

  handleMacChange = e => {
    this.setState({ mac: e.target.value });
  }

  handleSettingsChange = e => {
    this.setState({ settings: e.target.value });
  }

  handleKeyPress = e => {
    if (e.keyCode === 13) this.submit();
  }

  submit = () => {
    this.httpPostHost();
  }

  httpPostHost = () => {
    const body = JSON.stringify({
      name: this.state.name,
      ipv4: this.state.ipv4,
      ipv6: this.state.ipv6,
      mac: this.state.mac,
      settings: this.state.settings
    });
    this.props.httpRequest('POST', 'hosts', body, () => this.props.refresh());
  }

  render() {
    return (
      <form>
        <FormGroup controlId="formBasicText">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name.value}
            placeholder="Enter name"
            onChange={this.handleNameChange}
            onKeyDown={this.handleKeyPress}
          />
          <ControlLabel className="ControlLabel">IPv4 Address</ControlLabel>
          <FormControl
            type='text'
            value={this.state.ipv4.value}
            placeholder="Enter IPv4 address"
            onChange={this.handleIpv4Change}
            onKeyDown={this.handleKeyPress}
          />
          <ControlLabel className="ControlLabel">IPv6 Address</ControlLabel>
          <FormControl
            type='text'
            value={this.state.ipv6.value}
            placeholder="Enter IPv6 address"
            onChange={this.handleIpv6Change}
            onKeyDown={this.handleKeyPress}
          />
          <ControlLabel className="ControlLabel">MAC Address</ControlLabel>
          <FormControl
            type='text'
            value={this.state.mac.value}
            placeholder="Enter MAC address"
            onChange={this.handleMacChange}
            onKeyDown={this.handleKeyPress}
          />
          <ControlLabel className="ControlLabel">Settings</ControlLabel>
          <FormControl
            type='text'
            value={this.state.settings.value}
            placeholder="Enter settings"
            onChange={this.handleSettingsChange}
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
      </form>
    )
  }
}

export default HostCreate;
