import React, { Component } from 'react';
import '../App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import ErrorMessage from '../ErrorMessage.js';

/**
 * UI component for editing user
 */
class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      username: this.props.user.username,
      email: this.props.user.email,
      password: '',
      roles: this.props.user.roles,
      availableRoles: [{
        name: 'ROLE_ADMIN',
        prettyName: 'Admin'
      }],
      error: null
    };
  }

  /** Form change handler */
  handleFirstNameChange = e => {
    this.setState({ firstName: e.target.value });
  }

  /** Form change handler */
  handleLastNameChange = e => {
    this.setState({ lastName: e.target.value });
  }

  /** Form change handler */
  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  }

  /** Form change handler */
  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  }

  /** Form change handler */
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  }

  /** Form change handler */
  handleRolesChange = e => {
    this.setState({ roles: e.target.value });
  }

  /** Roles multi-select change handler */
  handleRolesChange = selection => {
    this.setState({ roles: selection.map(option => option.value) });
  }

  /** Return key press handler - calls submit() */
  handleKeyPress = e => {
    if (e.keyCode === 13) {
      this.submit();
    }
  }

  /** Puts user on form submit */
  submit = () => {
    this.httpPutUser();
  }

  /** Puts user */
  httpPutUser = () => {
    let body = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      roles: this.state.roles
    };
    Object.keys(body).forEach(
      key => (body[key] === undefined || body[key].length === 0) && delete body[key]
    );
    body = JSON.stringify(body);
    const callbackFunction = obj => {
      if (obj.error) {
        this.setState({
          error: obj.error.message
        });
      } else {
        this.props.httpGetUsers();
        this.setState({ redirect: true });
      }
    };
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest(
      'PUT', 'users/' + id, body, callbackFunction
    );
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/users/edit" exact to="/users" />}
        <FormGroup controlId="formFirstName">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.firstName ? this.state.firstName.value : ''}
            placeholder="Enter first name"
            onChange={this.handleFirstNameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formLastName">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.lastName ? this.state.lastName.value : ''}
            placeholder="Enter last name"
            onChange={this.handleLastNameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formUsername">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username ? this.state.username.value : ''}
            placeholder="Enter Username"
            onChange={this.handleUsernameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formEmail">
          <ControlLabel>E-Mail</ControlLabel>
          <FormControl
            type="test"
            value={this.state.email ? this.state.email.value : ''}
            placeholder="Enter e-mail address"
            onChange={this.handleEmailChange}
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

export default UserEdit;
