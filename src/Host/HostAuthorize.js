import React, { Component } from 'react';
import '../App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

/**
 * UI component for authorizing host
 */
class HostAuthorize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };
  }

  /** Form change handler */
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  }

  /** Return key press handler - calls submit() */
  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0) {
      this.submit();
    }
  }

  /** Puts host on form submit */
  submit = () => {
    this.httpPutHost();
  }

  /** Puts host */
  httpPutHost = () => {
    let body = {
      password: this.state.password,
    };
    body = JSON.stringify(body);
    const callbackFunction = obj => {
      if (obj.error) {
        this.setState({
          error: obj.error.message
        });
      } else {
        this.props.httpGetHosts();
        this.setState({ redirect: true });
      }
    }
    this.props.httpRequest(
      'POST', `hosts/${this.props.host.id}/authorization`, body, callbackFunction
    );
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/hosts/authorize" exact to="/hosts" />}
        <FormGroup controlId="formPassword" validationState={this.state.error ? 'error' : null}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password.value}
            placeholder="Enter password"
            onChange={this.handlePasswordChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.error}</HelpBlock>
        </FormGroup>
        <Button
          type="button"
          disabled={this.state.password.length < 1}
          onClick={this.submit}
        >
          Submit
        </Button>
      </form>
    )
  }
}

export default HostAuthorize;
