import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';

/**
 * UI component for editing container
 */
class ContainerEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.container.name,
      // settings: this.props.container.settings,
      // error: null  // TODO check error name and adjust
    };
  }

  /** Form change handler */
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  /** Return key press handler - calls submit() */
  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0) {
      this.submit();
    }
  }

  /** Puts container on form submit */
  submit = () => {
    this.httpPutContainer();
  }

  /** Puts edited container */
  httpPutContainer = () => {
    const body = JSON.stringify({
      name: this.state.name
      // TODO
    });
    const callbackFunction = obj => {
      if (obj.jsonData.errors) {
        this.setState({
          // error: obj.jsonData.errors.description,  // TODO
        });
      } else {
        this.props.httpGetContainers();
        this.setState({ redirect: true });
      }
    };
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest(
      'PUT', 'containers/' + id, body, callbackFunction
    );
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/containers/edit" exact to="/containers" />}
        <FormGroup controlId="formName" validationState={this.state.errorName ? 'error' : null}>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            defaultValue={this.state.name}
            value={this.state.name ? this.state.name.value : ''}
            placeholder="Enter name"
            onChange={this.handleNameChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.name.length < 1 && 'Please enter a name'}</HelpBlock>
        </FormGroup>
        <Button
          type="button"
          disabled={this.state.name.length < 1}
          onClick={this.submit}
        >
          Submit
        </Button>
      </form>
    )
  }
}

export default ContainerEdit;
