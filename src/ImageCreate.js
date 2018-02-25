import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Toggle from 'react-bootstrap-toggle';
import ErrorMessage from './ErrorMessage.js';
const JSON5 = require('json5');

/**
 * UI component for creating a new image.
 */
class ImageCreate extends Component {

  /**
   * @param {props} props from ImagePage
   */
  constructor(props) {
    super();
    this.state = {
      host: '',
      type: 'container',
      reqBody: {
        filename: '',
        public: false,
        properties: {},
        aliases: [
          {
            name: '',
            description: ''
          }
        ],
        source: {
          type: 'container',
          name: '',
          mode: 'pull',
          server: 'https://uk.images.linuxcontainers.org:8443',
          alias: ''
        }
      },
      containerNames: [],
      remoteAliases: [],
      error: null
    };
  }

  /** Gets called once component has mounted. Fetches hosts and remote aliases */
  componentDidMount() {
    this.props.httpGetHosts();
    this.httpGetRemoteAliases();
  }

  /** Fetches remote aliases */
  httpGetRemoteAliases = () => {
    const path = 'corsproxy?url=https://uk.images.linuxcontainers.org:8443/1.0/images/aliases';
    this.props.httpRequest('GET', path, null, obj => {
      if (obj.httpStatus !== 200) return;
      let aliases = obj.jsonData.metadata.filter(a => !a.endsWith('/default'));
      aliases = aliases.map(a => a.replace('/1.0/images/aliases/', ''));
      this.setState({ remoteAliases: aliases });
    });
  }

  /** Fetches containers from selected host */
  httpGetHostContainers = () => {
    const path = `hosts/${this.state.host}/containers`;
    this.props.httpRequest('GET', path, null, obj => {
      if (obj.httpStatus !== 200) return;
      this.setState({ hostContainers: obj.jsonData });
    });
  }

  /** Toggle button change handler */
  changeType = () => {
    const type = this.state.type === 'remote' ? 'container' : 'remote';
    const reqBody = this.state.reqBody;
    reqBody.source.type = this.state.type === 'remote' ? 'container' : 'image';
    this.setState({
      type: type,
      reqBody: reqBody
     });
  }

  /** Toggle button change handler */
  togglePublic = () => {
    const isPublic  = !this.state.reqBody.public;
    const reqBody = this.state.reqBody;
    reqBody.public = isPublic;
    this.setState({ reqBody: reqBody });
  }

  /** Form change handler */
  handleFilenameChange = e => {
    const reqBody = this.state.reqBody;
    reqBody.filename = e.target.value;
    this.setState({ reqBody: reqBody });
  }

  /** Form change handler */
  handlePropertiesChange = event => {
    const reqBody = this.state.reqBody;
    if (event.target.value === '') {
      reqBody.properties = {},
      this.setState({
        reqBody: reqBody,
        errorProperties: null
      });
      return;
    }
    try {
      const properties = JSON5.parse(event.target.value);  // using JSON5 to accept keys without quotes
      reqBody.properties = properties;
      this.setState({
        reqBody: reqBody,
        errorProperties: null
      });
    } catch (exception) {
      reqBody.properties = {};
      this.setState({
        reqBody: reqBody,
        errorProperties: 'Not a valid JSON object'
      });
    }
  }

  /** Form change handler */
  handleAliasNamesChange = e => {
    const reqBody = this.state.reqBody;
    const description = this.state.reqBody.aliases[0].description;
    const names = e.target.value.split(','); // Trailing char adds nameless alias -> is removed in httpPostImage()
    const aliases = names.map(name => {
      return { name: name.trim(), description: description }
    });
    reqBody.aliases = aliases;
    this.setState({ reqBody: reqBody });
  }

  /** Form change handler */
  handleAliasDescriptionChange = e => {
    const description = e.target.value;
    const reqBody = this.state.reqBody;
    reqBody.aliases = reqBody.aliases.map(alias => {
      return { name: alias.name, description: description}
    })
    this.setState({ reqBody: reqBody });
  }

  /** Form change handler */
  handleHostChange = e => {
    this.setState({ host: this.hostList.value }, () => {
      if (this.hostList.value)
        this.httpGetHostContainers();
      else
        this.setState({ containerNames: [] });
      }
    )
  }

  /** Form change handler */
  handleContainerNameChange = e => {
    const reqBody = this.state.reqBody;
    reqBody.source.name = this.containerNameList.value;
    this.setState({ reqBody: reqBody });
  }

  /** Form change handler */
  handleRemoteAliasChange = e => {
    const reqBody = this.state.reqBody;
    reqBody.source.alias = this.remoteAliasList.value;
    this.setState({ reqBody: reqBody });
  }

  /** Posts host on form submit */
  submit = () => {
    this.httpPostImage();
  }

  /** Posts image */
  httpPostImage = () => {
    const reqBody = this.state.reqBody;
    if (reqBody.source.alias.length > 0)
      reqBody.properties.source = reqBody.source.alias;
    reqBody.aliases = reqBody.aliases.filter(a => a.name); // remove aliases with empty name
    const body = JSON.stringify(this.state.reqBody);
    const callbackFunction = obj => {
      if (obj.error) {
        this.setState({
          error: obj.error.message
        });
      } else {
        this.props.httpGetImages();
        this.setState({
          error: null,
          redirect: true
        });
      }
    }
    const path = `hosts/${this.state.host}/images/${this.state.type}`;
    this.props.httpRequest('POST', path, body, callbackFunction);
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/images/create" exact to="/images" />}
        <Toggle
          onClick={this.togglePublic}
          on={<b>Public</b>}
          off={<b>Private</b>}
          size="md"
          onstyle="success"
          offstyle="info"
          active={this.state.reqBody.public}
          className="ToggleBtn"
        />
        <FormGroup controlId="formFilename">
          <ControlLabel>Filename</ControlLabel>
          <FormControl
            type="text"
            value={this.state.reqBody.filename}
            placeholder="Enter filename (optional)"
            onChange={this.handleFilenameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formProperties">
          <ControlLabel className="ControlLabel">Properties</ControlLabel>
          <FormControl
            componentClass="textarea"
            rows={10}
            value={this.state.reqBody.properties.value}
            placeholder="Enter optional config JSON object"
            onChange={this.handlePropertiesChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formAliasNames">
          <ControlLabel>Alias Names</ControlLabel>
          <FormControl
            type="text"
            value={this.state.reqBody.aliases.map(a => a.name).join(', ')}
            placeholder="Enter alias names (separated by comma)"
            onChange={this.handleAliasNamesChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <HelpBlock>
          {this.state.reqBody.aliases[0].name.length < 1 && 'Please enter at least one alias name'}
        </HelpBlock>
        <FormGroup controlId="formAliasDescription">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            type="text"
            value={this.state.reqBody.aliases[0].description}
            placeholder="Enter alias description"
            onChange={this.handleAliasDescriptionChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formHost">
          <ControlLabel>Host</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={this.handleHostChange}
            inputRef={ hl => this.hostList = hl }
          >
            <option value="">...</option>
            {this.props.hosts instanceof Array &&
              this.props.hosts.map(host =>
                <option key={host.id} value={host.id}>{host.name}</option>
              )
            }
          </FormControl>
          <HelpBlock>
            {this.state.host.length < 1 && 'Please choose a host'}
          </HelpBlock>
        </FormGroup>
        <ControlLabel>Source Type</ControlLabel>
        <br />
        <Toggle
          style={{ marginTop: '5px' }}
          onClick={this.changeType}
          on={<b>Local Container</b>}
          off={<b>Remote Image</b>}
          size="md"
          onstyle="success"
          offstyle="info"
          active={this.state.type === 'container'}
          className="ToggleBtn"
        />
        <br />
        <ControlLabel>Source</ControlLabel>
        {this.state.type === 'container' &&
        <FormGroup controlId="formContainerName">
          <FormControl
            componentClass="select"
            onChange={this.handleContainerNameChange}
            inputRef={ cl => this.containerNameList = cl }
            >
              <option value="">...</option>
              {this.state.hostContainers instanceof Array &&
                this.state.hostContainers.map((container, index) =>
                  <option key={index} value={container.name}>{container.name}</option>
                )
              }
            </FormControl>
            <HelpBlock>
              {this.state.reqBody.source.name.length < 1 && 'Please choose a container'}
            </HelpBlock>
          </FormGroup>
        }
        {this.state.type === 'remote' &&
        <FormGroup controlId="formRemoteAlias">
          <FormControl
            componentClass="select"
            onChange={this.handleRemoteAliasChange}
            inputRef={ rl => this.remoteAliasList = rl }
            >
              <option value="">...</option>
              {this.state.remoteAliases instanceof Array &&
                this.state.remoteAliases.map((alias, index) =>
                  <option key={index} value={alias}>{alias}</option>
                )
              }
            </FormControl>
            <HelpBlock>
              {this.state.reqBody.source.alias.length < 1 && 'Please choose a remote image'}
            </HelpBlock>
          </FormGroup>
        }
        <Button
          type="button"
          disabled={this.state.reqBody.aliases[0].name.length < 1 ||
                    this.state.host.length < 1 ||
                    (this.state.reqBody.source.type === 'container' &&
                    this.state.reqBody.source.name.length < 1) ||
                    (this.state.reqBody.source.type === 'image' &&
                    this.state.reqBody.source.alias.length < 1) ||
                    this.state.errorProperties}
          onClick={this.submit}
        >
          Submit
        </Button>
        <ErrorMessage message={this.state.error} />
      </form>
    )
  }
}

export default ImageCreate;
