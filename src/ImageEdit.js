import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Toggle from 'react-bootstrap-toggle';
import queryString from 'query-string';
import ErrorMessage from './ErrorMessage.js';

/**
 * UI component for editing images
 */
class ImageEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      reqBody: {
        public: this.props.image.public,
        properties: {
          os: this.props.image.properties.os
        }
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
      if (obj.error) {
        this.setState({
          error: obj.error.message
        });
      } else {
        this.props.httpGetImage();
        this.setState({
          error: null,
          redirect: true
        });
      }
    };
    const id = queryString.parse(window.location.search).id;
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
        <ErrorMessage message={this.state.error} />
      </form>
    )
  }
}

export default ImageEdit;
