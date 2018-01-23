import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Toggle from 'react-bootstrap-toggle';
import queryString from 'query-string';

/**
 * UI component for editing images
 */
class ImageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reqBody: {
        public: this.props.image.public,
        properties: {
          os: this.props.image.properties.os
        }
        // aliases: [{
        //   name: '',
        //   description: ''
        // }],
      }
    };
  }

  /** Toggle button change handler */
  togglePublic = () => {
    const isPublic  = !this.state.reqBody.public;
    const reqBody = this.state.reqBody;
    reqBody.public = isPublic;
    this.setState({ reqBody: reqBody });
  }

  /** Form change handler */
  handleOsChange = e => {
    const reqBody = this.state.reqBody;
    reqBody.properties.os = e.target.value;
    this.setState({ reqBody: reqBody });
  }

  // handleAliasDescriptionChange = e => {
  //   const reqBody = this.state.reqBody;
  //   reqBody.aliases[0].description = e.target.value;
  //   this.setState({ reqBody: reqBody });
  // }

  /** Return key press handler - calls submit() */
  handleKeyPress = e => {
    if (e.keyCode === 13) {
      this.submit();
    }
  }

  /** Posts host on form submit */
  submit = () => {
    this.httpPutImage();
  }

  /** Puts image */
  httpPutImage = () => {
    let body = this.state.reqBody;
    if (body.properties.os.length === 0) delete body.properties;
    body = JSON.stringify(body);
    const callbackFunction = obj => {
      if (obj.httpStatus !== 202) {
        this.setState({ resError: obj.jsonData.error.message});
      } else {
        this.props.httpGetImage();
        this.setState({
          resError: null,
          redirect: true
        });
      }
    };
    const id = queryString.parse(window.location.search).id;
    // console.log('body', this.state.reqBody);
    this.props.httpRequest('PUT', 'images/' + id, body, callbackFunction);
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
        <FormGroup controlId="formOS">
          <ControlLabel>OS</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.reqBody.properties && this.state.reqBody.properties.os}
            // value={this.state.reqBody.properties.os}
            placeholder="Enter OS (optional) e.g. 'Ubuntu'"
            onChange={this.handleOsChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        {/* <FormGroup controlId="formDescription">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.reqBody.aliases[0].description}
            value={this.state.reqBody.aliases[0].description}
            placeholder="Enter description (optional)"
            onChange={this.handleAliasDescriptionChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup> */}
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
