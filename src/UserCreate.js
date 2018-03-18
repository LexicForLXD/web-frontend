import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ErrorMessage from './ErrorMessage.js';
import Select from 'react-select';

/**
 * UI component for creating a new user
 */
class UserCreate extends Component {

  /**
   * @param {props} props from UserPage
   */
  constructor(props) {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      roles: [],
      availableRoles: [{
        name: 'ROLE_ADMIN',
        prettyName: 'Admin'
      }]
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

  /** Posts user on form submit */
  submit = () => {
    this.httpPostUser();
  }

  /** Posts user */
  httpPostUser = () => {
    let body = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      roles: this.state.roles
    };
    Object.keys(body).forEach(
      key => (body[key] === null || body[key] === undefined || body[key].length) === 0 && delete body[key]
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
    }
    this.props.httpRequest('POST', 'users', body, callbackFunction);
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/users/create" exact to="/users" />}
        <FormGroup controlId="formFirstName">
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.firstName.value}
            placeholder="Enter first name"
            onChange={this.handleFirstNameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formLastName">
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.lastName.value}
            placeholder="Enter last name"
            onChange={this.handleLastNameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formUsername">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username.value}
            placeholder="Enter Username"
            onChange={this.handleUsernameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formEmail">
          <ControlLabel>E-Mail</ControlLabel>
          <FormControl
            type="test"
            value={this.state.email.value}
            placeholder="Enter e-mail address"
            onChange={this.handleEmailChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formPassword">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password.value}
            placeholder="Enter password"
            onChange={this.handlePasswordChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <ControlLabel>Roles</ControlLabel>
        <Select
          multi
          closeOnSelect={false}
          name="formRoles"
          value={this.state.roles}
          onChange={this.handleRolesChange}
          options={this.state.availableRoles.map(role => {
            return { value: role.name, label: role.prettyName }
          })}
        />
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

export default UserCreate;
