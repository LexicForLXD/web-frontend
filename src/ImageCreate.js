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

  handleFilenameChange = e => {
    const reqBody = this.state.reqBody;
    reqBody.filename = e.target.value;
    this.setState({ reqBody: reqBody });
  }

  handleHostChange = e => {
    this.setState({ host: this.hostList.value });
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
    this.props.httpRequest('POST', path, body, callbackFunction);
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
          on="Local Container"
          off="Remote Image"
          size="lg"
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
