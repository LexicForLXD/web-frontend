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

/**
 * UI component for creating a new Monitoring
 */
class MonitoringCreate extends Component {
  /**
   * @param {props} props from MonitoringPage
   */
  constructor(props) {
    super();
    this.state = {
      type: "",
      container: "", // path: containerId
      host: "", // path: hostId
      // body:
      nagiosEnabled: true,
      nagiosName: "",
      nagiosUrl: "https://nagios.dn.fh-koeln.de/pnp4nagios/",
      checkName: "",
      sourceNumber: 0, // hardcoded
      error: null
    };
  }

  /**
   * Gets called once component has mounted. Fetches either containers or hosts.
   */
  componentDidMount() {
    if (this.props.container) {
      this.props.httpGetContainers();
      this.setState({ path: `monitoring/containers/create` });
    } else {
      this.props.httpGetHosts();
      this.setState({ type: "monitoring/hosts/create" });
    }
  }

  /** Form change handler */
  handleContainerChange = e => {
    this.setState({ container: this.containerList.value });
  };

  /** Form change handler */
  handleHostChange = e => {
    this.setState({ host: this.hostList.value });
  };

  /** Form change handler */
  handleNagiosNameChange = e => {
    this.setState({ nagiosName: e.target.value });
  };

  /** Form change handler */
  handleCheckNameChange = e => {
    this.setState({ checkName: e.target.value });
  };

  /** Return key press handler - calls submit() */
  handleKeyPress = e => {
    if (
      e.keyCode === 13 &&
      this.state.nagiosName.length > 0 &&
      this.state.checkName.length > 0
    ) {
      this.submit();
    }
  };

  /** Posts monitoring configuration on form submit */
  submit = () => {
    this.httpPostMonitoring();
  };

  /** Posts monitoring configuration */
  httpPostMonitoring = () => {
    let body = {
      nagiosEnabled: this.state.nagiosEnabled,
      nagiosName: this.state.nagiosName,
      nagiosUrl: this.state.nagiosUrl,
      checkName: this.state.checkName,
      sourceNumber: this.state.sourceNumber
    };
    Object.keys(body).forEach(
      key =>
        (body[key] === null || body[key] === undefined || body[key].length) ===
          0 && delete body[key]
    );
    body = JSON.stringify(body);
    const callbackFunction = obj => {
      if (obj.error) {
        this.setState({
          error: obj.error.message
        });
      } else {
        this.setState({
          error: null,
          redirect: true
        });
      }
    };
    const containersOrHosts = this.props.container ? "containers" : "hosts";
    const id = this.props.container ? this.state.container : this.state.host;
    this.props.httpRequest(
      "POST",
      `monitoring/checks/${containersOrHosts}/${id}`,
      body,
      callbackFunction
    );
  };

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && (
          <Redirect from={this.state.path} exact to="/monitoring" />
        )}
        {this.props.container && (
          <FormGroup controlId="formContainer">
            <ControlLabel>Container</ControlLabel>
            <FormControl
              componentClass="select"
              onChange={this.handleContainerChange}
              inputRef={cl => (this.containerList = cl)}
            >
              <option value="">...</option>
              {this.props.containers instanceof Array &&
                this.props.containers.map((container, index) => (
                  <option key={index} value={container.id}>
                    {container.name}
                  </option>
                ))}
            </FormControl>
            <HelpBlock>
              {this.state.container.length < 1 && "Please choose a container"}
            </HelpBlock>
          </FormGroup>
        )}
        {!this.props.container && (
          <FormGroup controlId="formHost">
            <ControlLabel>Host</ControlLabel>
            <FormControl
              componentClass="select"
              onChange={this.handleHostChange}
              inputRef={hl => (this.hostList = hl)}
            >
              <option value="">...</option>
              {this.props.hosts instanceof Array &&
                this.props.hosts.map((host, index) => (
                  <option key={index} value={host.id}>
                    {host.name}
                  </option>
                ))}
            </FormControl>
            <HelpBlock>
              {this.state.host.length < 1 && "Please choose a host"}
            </HelpBlock>
          </FormGroup>
        )}
        <FormGroup controlId="formNagiosName">
          <ControlLabel>Nagios Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.nagiosName.value}
            placeholder="Enter Nagios name"
            onChange={this.handleNagiosNameChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>
            {this.state.nagiosName.length < 1 && "Please enter Nagios name"}
          </HelpBlock>
        </FormGroup>
        <FormGroup controlId="forCheckName">
          <ControlLabel>Check Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.checkName.value}
            placeholder="Enter check name"
            onChange={this.handleCheckNameChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>
            {this.state.checkName.length < 1 && "Please enter check name"}
          </HelpBlock>
        </FormGroup>
        <Button
          type="button"
          disabled={
            this.state.nagiosName.length < 1 && this.state.checkName.length < 1
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

export default MonitoringCreate;
