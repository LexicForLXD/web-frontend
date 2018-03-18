import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Toggle from 'react-bootstrap-toggle';
import queryString from 'query-string';
import ErrorMessage from './ErrorMessage.js';
const JSON5 = require('json5');

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
        properties: this.props.image.properties
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
  handlePropertiesChange = event => {
    const reqBody = this.state.reqBody;
    if (event.target.value === '') {
      reqBody.properties = {};
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

  /** Posts host on form submit */
  submit = () => {
    this.httpPutImage();
  }

  /** Puts image */
  httpPutImage = () => {
    let body = this.state.reqBody;
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
        <FormGroup controlId="formProperties">
          <ControlLabel className="ControlLabel">Properties</ControlLabel>
          <FormControl
            componentClass="textarea"
            rows={10}
            defaultValue={JSON.stringify(this.state.reqBody.properties, null, 2)}
            value={this.state.reqBody.value}
            placeholder="Enter optional config JSON object"
            onChange={this.handlePropertiesChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorProperties}</HelpBlock>
        </FormGroup>
        <Button
          type="button"
          disabled={this.state.errorProperties}
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
