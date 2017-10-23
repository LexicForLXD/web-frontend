import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl,
         Grid, Row, Col } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super();
    this.state = {
      username: '',
      password: ''
    };
  }

  login = () => {
    this.props.login();
    this.props.print('Login: logged in')
  }

  logout = () => {
    this.props.logout();
    this.props.print('Login: logged out')
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  }

  submit = () => {
    this.login();  // To be replaced with authentification logic call
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <Button type="btn"
          className="Logout"
          bsStyle="link"
          onClick={this.logout}>
          Logout
        </Button>
      );
    } else {
      return (
        <Grid className="Login">
          <Row>
            <Col xs={6} xsOffset={3}>
              <form>
                <FormGroup controlId="formBasicText">
                  <ControlLabel>Username</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.username.value}
                    placeholder="Enter username"
                    onChange={this.handleUsernameChange}
                  />
                  <ControlLabel className="ControlLabel">Password</ControlLabel>
                  <FormControl
                    type='password'
                    value={this.state.password.value}
                    placeholder="Enter password"
                    onChange={this.handlePasswordChange}
                  />
                </FormGroup>
                <Button type="button" onClick={this.submit}>Submit</Button>
              </form>
            </Col>
          </Row>
        </Grid>
      )
    }
  }
}

export default Navigation;
