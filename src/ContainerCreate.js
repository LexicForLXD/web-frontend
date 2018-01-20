import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css'; // move to index.js if used more than once
import Toggle from 'react-bootstrap-toggle';
const JSON5 = require('json5');

/**
 * UI component for creating a new container
 */
class ContainerCreate extends Component {

  /**
   * @param {props} props from ContainerPage
   */
  constructor(props) {
    super();
    this.state = {
      error: null,          // POST request error message
      aliases: [],          // fetched from linuxcontainers.org
      host: '',             // path: hostId
      type: 'none',         // query: image, migration, copy or none (default)
      // body:
      name: '',             // all
      architecture: 'x86_64', // hardcoded - no other valid values documented!
      profiles: [
        null
      ],                    // all
      ephemeral: false,     // all
      config: '',           // all
      devices: '',          // all
      fingerprint: '',      // only image (bodyFingerprint)
      alias: '',            // only image (bodyAlias)
      oldContainerId: '',   // only migration, copy (bodyMigration, bodyCopy)
      containerOnly: false, // only migration, copy (bodyMigration, bodyCopy)
      live: false           // only migration (bodyMigration)
    };
  }

  /**
   * Gets called once component has mounted. Fetches hosts and aliases.
   */
  componentDidMount() {
    this.props.httpGetHosts();
    this.props.httpGetProfiles();
    this.httpGetAliases();
    this.props.httpGetContainers();
  }

  /** Form change handler */
  handleHostChange = e => {
    this.setState({ host: this.hostList.value });
  }

  handleTypeChange = e => {
    this.setState({ type: this.typeList.value });
  }

  /** Form change handler */
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  /** Profiles multi-select change handler */
  handleProfilesChange = selection => {
    this.setState({ profiles: selection.map(option => option.value) });
  }

  toggleEphemeral = () => {
    const ephemeral = !this.state.ephemeral;
    this.setState({ ephemeral: ephemeral });
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

  /** Form change handler */
  handleFingerprintChange = e => {
    this.setState({ fingerprint: e.target.value });
  }

  /** Form change handler */
  handleAliasChange = e => {
    this.setState({ alias: this.aliasList.value });
  }

  /** Form change handler */
  handleOldContainerChange = e => {
    this.setState({ oldContainerId: this.oldContainerList.value });
  }

  toggleContainerOnly = () => {
    const containerOnly = !this.state.containerOnly;
    this.setState({ containerOnly: containerOnly });
  }

  toggleLive = () => {
    const live = !this.state.live;
    this.setState({ live: live });
  }

  /** Return key press handler - calls submit()*/
  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0) {
      this.submit();
    }
  }

  /** Posts container on form submit */
  submit = () => {
    this.httpPostContainer();
  }

  /** Fetches aliases */
  httpGetAliases = () => {
    const url = 'corsproxy?url=https://uk.images.linuxcontainers.org:8443/1.0/images/aliases';
    this.props.httpRequest('GET', url, null, obj => {
      const aliases = obj.jsonData.metadata.filter(a => !a.endsWith('/default'));
      this.setState({ aliases: aliases });
    });
  }

  /** Posts container */
  httpPostContainer = () => {
    let body = {
      name: this.state.name,
      architecture: this.state.architecture,
      profiles: this.state.profiles,
      ephemeral: this.state.ephemeral,
      config: this.state.config,
      devices: this.state.devices,
      fingerprint: this.state.fingerprint,
      alias: this.state.alias,
      oldContainerId: this.state.oldContainerId,
      containerOnly: this.state.containerOnly,
      live: this.state.false
    }
    Object.keys(body).forEach(
      key => (body[key] === null || body[key] === undefined ||
             body[key].length === 0) && delete body[key]
    );
    body = JSON.stringify(body);
    const callbackFunction = obj => {
      if (obj.jsonData.errors) {
        this.setState({
          error: 'Error' // TODO set error message
        });
      } else {
        this.props.httpGetContainers();
        this.setState({ redirect: true });
      }
    };
    // console.log('body', body);
    this.props.httpRequest(
      'POST', `hosts/${this.state.host}/containers?type=${this.state.type}`,
      body, callbackFunction
    );
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/containers/create" exact to="/containers" />}
        <FormGroup controlId="formHost">
          <ControlLabel>Host</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={this.handleHostChange}
            inputRef={ hl => this.hostList = hl }
          >
            <option value="">...</option>
            {this.props.hosts instanceof Array &&
              this.props.hosts.map((host, index) =>
                <option key={index} value={host.id}>{host.name}</option>
              )
            }
          </FormControl>
          <HelpBlock>{this.state.host.length < 1 && 'Please choose a host'}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formType">
          <ControlLabel>Type</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={this.handleTypeChange}
            inputRef={ tl => this.typeList = tl }
          >
            <option value="none">None</option>
            <option value="image">Image</option>
            <option value="copy">Copy</option>
            <option value="migrate">Migrate</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formName" validationState={this.state.errorName ? 'error' : null}>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name.value}
            placeholder="Enter name"
            onChange={this.handleNameChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.name.length < 1 && 'Please enter a name'}</HelpBlock>
        </FormGroup>
        <ControlLabel>Profiles</ControlLabel>
        <Select
          multi
          closeOnSelect={false} // is this default?
          name="formProfiles"
          value={this.state.profiles}
          onChange={this.handleProfilesChange}
          options={this.props.profiles.map(profile => {
            return { value: profile.id, label: profile.name }
          })}
        />
        <ControlLabel>Ephemeral</ControlLabel><br />
        <Toggle
          onClick={this.toggleEphemeral}
          on={<b>True</b>}
          off={<b>False</b>}
          size="md"
          onstyle="success"
          offstyle="info"
          active={this.state.ephemeral}
          className="ToggleBtn"
          style={{ marginTop: '5px' }}
        />
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
        <FormGroup controlId="formFingerprint">
          <ControlLabel>Fingerprint</ControlLabel>
          <FormControl
            type="text"
            value={this.state.fingerprint.value}
            placeholder="Enter fingerprint"
            onChange={this.handleFingerprintChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formAlias">
          <ControlLabel>Alias</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={this.handleAliasChange}
            inputRef={ list => this.aliasList = list }
          >
            <option value="">...</option>
            {this.state.aliases instanceof Array &&
              this.state.aliases.map((alias, index) =>
                <option key={index} value={alias}>{alias}</option>
              )
            }
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formOldContainer">
          <ControlLabel>Existing Container</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={this.handleOldContainerChange}
            inputRef={ list => this.oldContainerList = list }
          >
            <option value="">...</option>
            {this.props.containers instanceof Array &&
              this.props.containers.map(container =>
                <option key={container.id} value={container.id}>{container.name}</option>
              )
            }
          </FormControl>
        </FormGroup>
        <ControlLabel>Container Only</ControlLabel><br />
        <Toggle
          onClick={this.toggleContainerOnly}
          on={<b>True</b>}
          off={<b>False</b>}
          size="md"
          onstyle="success"
          offstyle="info"
          active={this.state.containerOnly}
          className="ToggleBtn"
          style={{ marginTop: '5px' }}
        /><br />
        <ControlLabel>Live</ControlLabel><br />
        <Toggle
          onClick={this.toggleLive}
          on={<b>True</b>}
          off={<b>False</b>}
          size="md"
          onstyle="success"
          offstyle="info"
          active={this.state.live}
          className="ToggleBtn"
          style={{ marginTop: '5px', marginBottom: '25px' }}
        /><br />
        <Button
          type="button"
          disabled={this.state.host.length < 1 || this.state.name.length < 1}
          onClick={this.submit}
        >
          Submit
        </Button>
      </form>
    )
  }
}

export default ContainerCreate;
