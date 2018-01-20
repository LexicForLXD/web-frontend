import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Toggle from 'react-bootstrap-toggle';

/**
 * UI component for editing images
 */
class ImageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqBody: {
          auto_update: this.props.image.auto_update,
          "properties": {
              architecture: this.props.image.architecture,
              description: this.props.image.description,
              os: this.props.image.properties,
              release: this.props.image.release
          },
          public: this.props.image.public
        }
    };
  }

  togglePublic = () => {
    const isPublic  = !this.state.reqBody.public;
    const reqBody = this.state.reqBody;
    reqBody.public = isPublic;
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
    this.setState({ host: this.hostList.value }, () => {
      if (this.hostList.value)
        this.httpGetHostContainers();
      else
        this.setState({ containerNames: [] });
      }
    )
  }

  handleRemoteAliasChange = e => {
    const reqBody = this.state.reqBody;
    reqBody.source.url =
      'https://uk.images.linuxcontainers.org:8443' +
      this.remoteAliasList.value;
    this.setState({ host: this.remoteAliasList.value });
  }

  handleKeyPress = e => {
    if (e.keyCode === 13) {
      this.submit();
    }
  }

  submit = () => {
    this.httpPutImage();
  }

  httpPutImage = () => {
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
    const path = 'images/' + this.props.image.id;
    // console.log('body', body);
    this.props.httpRequest('PUT', path, body, callbackFunction);
  }

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
        <Button
          type="button"
          onClick={this.submit}
        >
          Submit
        </Button>
        <HelpBlock>{this.state.resError}</HelpBlock>
      </form>
    )
  }
}

export default ImageEdit;
