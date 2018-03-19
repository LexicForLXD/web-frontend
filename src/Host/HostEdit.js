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

/**
 * UI component for editing host
 */
class HostEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.host.name,
      password: "",
      ipv4: this.props.host.ipv4,
      ipv6: this.props.host.ipv6,
      domainName: this.props.host.domainName,
      port: this.props.host.port,
      mac: this.props.host.mac,
      settings: this.props.host.settings,
      error: null
    };
  }

  /** Form change handler */
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  /** Form change handler */
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  /** Form change handler */
  handleIpv4Change = e => {
    this.setState({ ipv4: e.target.value });
  };

  /** Form change handler */
  handleIpv6Change = e => {
    this.setState({ ipv6: e.target.value });
  };

  /** Form change handler */
  handleDomainNameChange = e => {
    this.setState({ domainName: e.target.value });
  };

  /** Form change handler */
  handlePortChange = e => {
    this.setState({ port: e.target.value });
  };

  /** Form change handler */
  handleMacChange = e => {
    this.setState({ mac: e.target.value });
  };

  /** Form change handler */
  handleSettingsChange = e => {
    this.setState({ settings: e.target.value });
  };

  /** Return key press handler - calls submit() */
  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0) {
      this.submit();
    }
  };

  /** Puts host on form submit */
  submit = () => {
    this.httpPutHost();
  };

  /** Puts host */
  httpPutHost = () => {
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
        this.props.httpGetHosts();
        this.setState({ redirect: true });
      }
    };
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest("PUT", "hosts/" + id, body, callbackFunction);
  };

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && (
          <Redirect from="/hosts/edit" exact to="/hosts" />
        )}
        <FormGroup controlId="formName">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name ? this.state.name.value : ""}
            placeholder="Enter name"
            onChange={this.handleNameChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>
            {this.state.name.length < 1 && "Please enter a name"}
          </HelpBlock>
        </FormGroup>
        {!this.props.host.authenticated && (
          <FormGroup controlId="formPassword">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password.value}
              placeholder="Enter password"
              onChange={this.handlePasswordChange}
              onKeyDown={this.handleKeyPress}
            />
          </FormGroup>
        )}
        <FormGroup controlId="formIpv4">
          <ControlLabel className="ControlLabel">IPv4 Address</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.ipv4}
            value={this.state.ipv4 ? this.state.ipv4.value : ""}
            placeholder="Enter IPv4 address"
            onChange={this.handleIpv4Change}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formIpv6">
          <ControlLabel className="ControlLabel">IPv6 Address</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.ipv6}
            value={this.state.ipv6 ? this.state.ipv6.value : ""}
            placeholder="Enter IPv6 address"
            onChange={this.handleIpv6Change}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formDomainName">
          <ControlLabel className="ControlLabel">Domain Name</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.domainName}
            value={this.state.domainName ? this.state.domainName.value : ""}
            placeholder="Enter domain name"
            onChange={this.handleDomainNameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formMac">
          <ControlLabel className="ControlLabel">MAC Address</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.mac}
            value={this.state.mac ? this.state.mac.value : ""}
            placeholder="Enter MAC address"
            onChange={this.handleMacChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formPort">
          <ControlLabel className="ControlLabel">Port</ControlLabel>
          <FormControl
            type="text"
            value={this.state.port ? this.state.port.value : ""}
            placeholder="Enter port"
            onChange={this.handlePortChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formSettings">
          <ControlLabel className="ControlLabel">Settings</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.settings}
            value={this.state.settings ? this.state.settings.value : ""}
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
        <ErrorMessage message={this.state.error} />
      </form>
    );
  }
}

export default HostEdit;
