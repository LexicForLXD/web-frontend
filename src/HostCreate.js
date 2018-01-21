import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

/**
 * UI component for creating a new host
 */
class HostCreate extends Component {

  /**
   * @param {props} props from HostPage
   */
  constructor(props) {
    super();
    this.state = {
      name: '',
      password: '',
      ipv4: '',
      ipv6: '',
      domainName: '',
      port: '',
      mac: '',
      settings: '',
      errorName: null,
      errorPassword: null,
      errorIpv4: null,
      errorIpv6: null,
      errorDomainName: null,
      errorPort: null,
      errorMac: null,
      errorSettings: null
    };
  }

  /** Form change handler */
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  /** Form change handler */
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  }

  /** Form change handler */
  handleIpv4Change = e => {
    this.setState({ ipv4: e.target.value });
  }

  /** Form change handler */
  handleIpv6Change = e => {
    this.setState({ ipv6: e.target.value });
  }

  /** Form change handler */
  handleDomainNameChange = e => {
    this.setState({ domainName: e.target.value });
  }

  /** Form change handler */
  handlePortChange = e => {
    this.setState({ port: e.target.value });
  }

  /** Form change handler */
  handleMacChange = e => {
    this.setState({ mac: e.target.value });
  }

  /** Form change handler */
  handleSettingsChange = e => {
    this.setState({ settings: e.target.value });
  }

  /** Return key press handler - calls submit()*/
  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0) {
      this.submit();
    }
  }

  /** Posts host on form submit */
  submit = () => {
    this.httpPostHost();
  }

  /** Posts host */
  httpPostHost = () => {
    let body = {
      name: this.state.name,
      password: this.state.password,
      ipv4: this.state.ipv4,
      ipv6: this.state.ipv6,
      domainName: this.state.domainName,
      port: this.state.port,
      mac: this.state.mac,
      settings: this.state.settings
    };
    Object.keys(body).forEach(
      key => (body[key] === null || body[key] === undefined || body[key].length) === 0 && delete body[key]
    );
    body = JSON.stringify(body);
    const callbackFunction = obj => {
      if (obj.jsonData.errors) {
        this.setState({
          errorName: obj.jsonData.errors.name,
          errorPassword: obj.jsonData.errors.password,
          errorIpv4: obj.jsonData.errors.ipv4,
          errorIpv6: obj.jsonData.errors.ipv6,
          errorDomainName: obj.jsonData.errors.domainName,
          errorPort: obj.jsonData.errors.port,
          errorMac: obj.jsonData.errors.mac,
          errorSettings: obj.jsonData.errors.settings
        });
      } else {
        this.props.httpGetHosts();
        this.setState({ redirect: true });
      }
    }
    this.props.httpRequest('POST', 'hosts', body, callbackFunction);
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/hosts/create" exact to="/hosts" />}
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
        <FormGroup controlId="formPassword" validationState={this.state.errorPassword ? 'error' : null}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password.value}
            placeholder="Enter password"
            onChange={this.handlePasswordChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorPassword}</HelpBlock>
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
            value={this.state.domainName.value}
            placeholder="Enter domain name"
            onChange={this.handleDomainNameChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorDomainName}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formPort" validationState={this.state.errorPort ? 'error' : null}>
          <ControlLabel className="ControlLabel">Port</ControlLabel>
          <FormControl
            type='text'
            value={this.state.port.value}
            placeholder="Enter port"
            onChange={this.handlePortChange}
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
