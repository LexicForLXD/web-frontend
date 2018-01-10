import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

/**
 * UI component for editing images
 */
class ImageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.image.name,
      ipv4: this.props.image.ipv4,
      ipv6: this.props.image.ipv6,
      domain_name: this.props.image.domain_name,
      mac: this.props.image.mac,
      settings: this.props.image.settings,
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
    this.httpPutImage();
  }

  httpPutImage = () => {
    const body = JSON.stringify({
      name: this.state.name,
      ipv4: this.state.ipv4,
      ipv6: this.state.ipv6,
      domain_name: this.state.domain_name,
      mac: this.state.mac,
      settings: this.state.settings
    });
    const callbackFunction = obj => {
      if (obj.jsonData.errors) {
        this.setState({
          errorName: obj.jsonData.errors.name,
          errorIpv4: obj.jsonData.errors.ipv4,
          errorIpv6: obj.jsonData.errors.ipv6,
          errorDomainName: obj.jsonData.errors.domainName,
          errorMac: obj.jsonData.errors.mac,
          errorSettings: obj.jsonData.errors.settings
        });
      } else {
        this.props.httpGetImages();
        this.setState({ redirect: true });
      }
    }
    this.props.httpRequest(
      'PUT', `images/${this.props.image.id}`, body, callbackFunction
    );
  }

  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/images/edit" exact to="/images" />}
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
            defaultValue={this.state.domain_name}
            value={this.state.domain_name ? this.state.domain_name.value : ''}
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

export default ImageEdit;
