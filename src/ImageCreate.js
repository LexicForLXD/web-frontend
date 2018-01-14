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
          url: ''
        }
      },
      resError: null
    };
  }

  componentDidMount() {
    this.props.httpGetHosts();
  }

  changeType = () => {
    const type = this.state.type === 'remote' ? 'container' : 'remote';
    const reqBody = this.state.reqBody;
    reqBody.source.type = this.state.type === 'remote' ? 'container' : 'url';
    this.setState({
      type: type,
      reqBody: reqBody
     });
  }

  togglePublic = () => {
    const isPublic  = !this.state.reqBody.public;
    const reqBody = this.state.reqBody;
    reqBody.public = isPublic;
    this.setState({ reqBody: reqBody });
  }

  handleFilenameChange = e => {
    const reqBody = this.state.reqBody;
    reqBody.filename = e.target.value;
    this.setState({ reqBody: reqBody });
  }

  handleOsChange = e => {
    const reqBody = this.state.reqBody;
    reqBody.properties.os = e.target.value;
    this.setState({ reqBody: reqBody });
  }

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

  handleAliasDescriptionChange = e => {
    const description = e.target.value;
    const reqBody = this.state.reqBody;
    reqBody.aliases = reqBody.aliases.map(alias => {
      return { name: alias.name, description: description}
    })
    this.setState({ reqBody: reqBody });
  }

  handleHostChange = e => {
    this.setState({ host: this.hostList.value });
  }

  handleKeyPress = e => {
    if (e.keyCode === 13) {
      this.submit();
    }
  }

  submit = () => {
    this.httpPostImage();
  }

  httpPostImage = () => {
    const reqBody = this.state.reqBody;
    reqBody.aliases = reqBody.aliases.filter(a => a.name); // remove aliases with empty name
    const keyToRemove = this.state.type === 'remote' ? 'name' : 'url'
    delete reqBody.source[keyToRemove];
    const body = JSON.stringify(this.state.reqBody);
    const callbackFunction = obj => {
      if (obj.httpStatus !== 202) {
        this.setState({ resError: obj.httpStatus });
      } else {
        this.props.httpGetImages();
        this.setState({
          resError: null,
          redirect: true
        });
      }
    }
    const path = `hosts/${this.state.hostId}/images/${this.state.type}`;
    console.log('body', body);
    // this.props.httpRequest('POST', path, body, callbackFunction);
  }

  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/images/create" exact to="/images" />}
        {/* <Button type="button" bsStyle="info" onClick={this.changeType}>
          {this.state.type}
        </Button> */}
        <ControlLabel>Source</ControlLabel><br />
        <Toggle
          onClick={this.changeType}
          on={<b>Local Container</b>}
          off={<b>Remote Image</b>}
          size="md"
          onstyle="success"
          offstyle="info"
          active={this.state.type === 'container'}
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
        <ControlLabel>Download</ControlLabel><br />
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
            placeholder="Enter Alias names (separated by comma)"
            onChange={this.handleAliasNamesChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formAliasDescription">
          <ControlLabel>Alias Description</ControlLabel>
          <FormControl
            type="text"
            value={this.state.reqBody.aliases[0].description}
            placeholder="Enter Alias description (optional)"
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
            <option>...</option>
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
        {/* <FormGroup controlId="formContainer">
          <ControlLabel>Container</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={this.handleContainerChange}
            inputRef={ hl => this.containerList = hl }
          >
            <option>...</option>
            {this.props.containers instanceof Array &&
              this.props.images.map(image =>
                <option value={image.id}>{image.name}</option>
              )
            }
          </FormControl>
        </FormGroup> */}
        <Button type="button" onClick={this.submit}>Submit</Button>
      </form>
    )
  }
}

export default ImageCreate;
