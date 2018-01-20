import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

/**
 * UI component for editing host
 */
class HostEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.host.name,
      password: '',
      ipv4: this.props.host.ipv4,
      ipv6: this.props.host.ipv6,
      domainName: this.props.host.domainName,
      mac: this.props.host.mac,
      settings: this.props.host.settings,
      errorName: null,
      errorPassword: null,
      errorIpv4: null,
      errorIpv6: null,
      errorDomainName: null,
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
  handleMacChange = e => {
    this.setState({ mac: e.target.value });
  }

  /** Form change handler */
  handleSettingsChange = e => {
    this.setState({ settings: e.target.value });
  }

  /** Return key press handler - calls submit() */
  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0) {
      this.submit();
    }
  }

  /** Puts host on form submit */
  submit = () => {
    this.httpPutHost();
  }

  /** Puts host */
  httpPutHost = () => {
    let body = {
      name: this.state.name,
      password: this.state.password,
      ipv4: this.state.ipv4,
      ipv6: this.state.ipv6,
      domainName: this.state.domainName,
      mac: this.state.mac,
      settings: this.state.settings
    };
    Object.keys(body).forEach(
      key => body[key] === undefined || body[key].length === 0 && delete body[key]
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
          errorMac: obj.jsonData.errors.mac,
          errorSettings: obj.jsonData.errors.settings
        });
      } else {
        this.props.httpGetHosts();
        this.setState({ redirect: true });
      }
    }
    this.props.httpRequest(
      'PUT', `hosts/${this.props.host.id}`, body, callbackFunction
    );
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/hosts/edit" exact to="/hosts" />}
        <FormGroup controlId="formName" validationState={this.state.errorName ? 'error' : null}>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.name}
            value={this.state.name ? this.state.name.value : ''}
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
            placeholder="Enter new password"
            onChange={this.handlePasswordChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorPassword}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formIpv4" validationState={this.state.errorIpv4 ? 'error' : null}>
          <ControlLabel className="ControlLabel">IPv4 Address</ControlLabel>
          <FormControl
            type='text'
            defaultValue={this.state.ipv4}
            value={this.state.ipv4 ? this.state.ipv4.value : ''}
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
            defaultValue={this.state.ipv6}
            value={this.state.ipv6 ? this.state.ipv6.value : ''}
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
            defaultValue={this.state.domainName}
            value={this.state.domainName ? this.state.domainName.value : ''}
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
            defaultValue={this.state.mac}
            value={this.state.mac ? this.state.mac.value : ''}
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
            defaultValue={this.state.settings}
            value={this.state.settings ? this.state.settings.value : ''}
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

export default HostEdit;
