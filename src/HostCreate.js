import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class HostCreate extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      ipv4: '',
      ipv6: '',
      domain_name: '',
      mac: '',
      settings: '',
      errorName: null,
      errorIpv4: null,
      errorIpv6: null,
      errorDomainName: null,
      errorMac: null,
      errorSettings: null
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

  handleDomainNameChange = e => {
    this.setState({ domain_name: e.target.value });
  }

  handleMacChange = e => {
    this.setState({ mac: e.target.value });
  }

  handleSettingsChange = e => {
    this.setState({ settings: e.target.value });
  }

  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0) {
      this.submit();
    }
  }

  submit = () => {
    this.httpPostHost();
  }

  httpPostHost = () => {
    const body = JSON.stringify({
      name: this.state.name,
      ipv4: this.state.ipv4,
      ipv6: this.state.ipv6,
      domain_name: this.state.domain_name,
      mac: this.state.mac,
      settings: this.state.settings
    });
    const callbackFunction = json => {
      if (json.errors) {
        this.setState({
          errorName: json.errors.name,
          errorIpv4: json.errors.ipv4,
          errorIpv6: json.errors.ipv6,
          errorDomainName: json.errors.domainName,
          errorMac: json.errors.mac,
          errorSettings: json.errors.settings
        });
      } else {
        this.props.goToOverview();
      }
      this.props.httpGetHosts();
    }
    this.props.httpRequest('POST', 'hosts', body, callbackFunction);
  }

  render() {
    return (
      <form>
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
        <FormGroup controlId="formIpv4" validationState={this.state.errorIpv4 ? 'error' : null}>
          <ControlLabel className="ControlLabel">IPv4 Address</ControlLabel>
          <FormControl
            type='text'
            value={this.state.ipv4.value}
            placeholder="Enter IPv4 address"
            onChange={this.handleIpv4Change}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorIpv4}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formIpv6" validationState={this.state.errorIpv6 ? 'error' : null}>
          <ControlLabel className="ControlLabel">IPv6 Address</ControlLabel>
          <FormControl
            type='text'
            value={this.state.ipv6.value}
            placeholder="Enter IPv6 address"
            onChange={this.handleIpv6Change}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorIpv6}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formDomainName" validationState={this.state.errorDomainName ? 'error' : null}>
          <ControlLabel className="ControlLabel">Domain Name</ControlLabel>
          <FormControl
            type='text'
            value={this.state.domain_name.value}
            placeholder="Enter domain name"
            onChange={this.handleDomainNameChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorDomainName}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formMac" validationState={this.state.errorMac ? 'error' : null}>
          <ControlLabel className="ControlLabel">MAC Address</ControlLabel>
          <FormControl
            type='text'
            value={this.state.mac.value}
            placeholder="Enter MAC address"
            onChange={this.handleMacChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorMac}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formSettings" validationState={this.state.errorSettings ? 'error' : null}>
          <ControlLabel className="ControlLabel">Settings</ControlLabel>
          <FormControl
            type='text'
            value={this.state.settings.value}
            placeholder="Enter settings"
            onChange={this.handleSettingsChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorSettings}</HelpBlock>
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
