import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Toggle from 'react-bootstrap-toggle';

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
        properties: {
          os: ''
        },
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
      resError: null
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
    // const path = `hosts/${this.state.host}/containers?fresh=true`;
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
  handleOsChange = e => {
    const reqBody = this.state.reqBody;
    reqBody.properties.os = e.target.value;
    this.setState({ reqBody: reqBody });
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
  handleRemoteAliasChange = e => {
    const reqBody = this.state.reqBody;
    // reqBody.source.url =
      // 'https://uk.images.linuxcontainers.org:8443' +
      // this.remoteAliasList.value;
    reqBody.source.alias = this.remoteAliasList.value;
    this.setState({ reqBody: reqBody });
  }

  /** Return key press handler - calls submit()*/
  handleKeyPress = e => {
    if (e.keyCode === 13) {
      this.submit();
    }
  }

  /** Posts host on form submit */
  submit = () => {
    this.httpPostImage();
  }

  /** Posts image */
  httpPostImage = () => {
    const reqBody = this.state.reqBody;
    reqBody.aliases = reqBody.aliases.filter(a => a.name); // remove aliases with empty name
    // const keyToRemove = this.state.type === 'remote' ? 'name' : 'url'
    // delete reqBody.source[keyToRemove];
    // Object.keys(reqBody).forEach(
    //   key => reqBody[key].length === 0 && delete reqBody[key]
    // );
    const body = JSON.stringify(this.state.reqBody);
    const callbackFunction = obj => {
      if (obj.httpStatus !== 202) {
        this.setState({ resError: obj.jsonData.error.message});
      } else {
        this.props.httpGetImages();
        this.setState({
          resError: null,
          redirect: true
        });
      }
    }
    const path = `hosts/${this.state.host}/images/${this.state.type}`;
    // console.log('body', body);
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
        <FormGroup controlId="formOS">
          <ControlLabel>OS</ControlLabel>
          <FormControl
            type="text"
            value={this.state.reqBody.properties.os}
            placeholder="Enter OS (optional) e.g. 'Ubuntu'"
            onChange={this.handleOsChange}
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
            placeholder="Enter alias description (optional)"
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
                this.state.hostContainers.map(container =>
                  <option value={container.id}>{container.name}</option>
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
                this.state.remoteAliases.map(alias =>
                  <option value={alias}>{alias}</option>
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
                    (this.state.reqBody.source.alias.length < 1)}
          onClick={this.submit}
        >
          Submit
        </Button>
        <HelpBlock>{this.state.resError}</HelpBlock>
      </form>
    )
  }
}

export default ImageCreate;
