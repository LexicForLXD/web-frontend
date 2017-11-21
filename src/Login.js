import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock,
         Grid, Row, Col } from 'react-bootstrap';

class Navigation extends Component {
  constructor(props) {
    super();
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this.state = {
      username: '',
      password: '',
      errorDescription: null
    };
  }

  login = () => {
    this.props.login();
  }

  logout = () => {
    this.props.logout();
  }

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  }

  handleKeyPress = e => {
    if (e.keyCode === 13) this.submit();
  }

  submit = () => {
    const url = 'https://lxd-api.lleon.de/oauth/v2/token';  // Replace in production
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'password',
        client_id: '11_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4',
        client_secret: '4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k',
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log('Response body: ', json); // Remove in production
      this.setState({ errorDescription: json.error_description });
      this.props.setAccessToken(json.access_token);
      this.props.setRefreshToken(json.refresh_token);
      if (json.access_token) this.login();
    })
    .catch(error => console.log('Request failed: ', error)); // Remove in production
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <Button
          type="button"
          className="Logout"
          bsSize="xsmall"
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
                <FormGroup controlId="formLogin" validationState={this.state.errorDescription ? 'error' : null}>
                  <ControlLabel>Username</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.username.value}
                    placeholder="Enter username"
                    onChange={this.handleUsernameChange}
                    onKeyDown={this.handleKeyPress}
                    autoFocus
                  />
                  <ControlLabel className="ControlLabel">Password</ControlLabel>
                  <FormControl
                    type='password'
                    value={this.state.password.value}
                    placeholder="Enter password"
                    onChange={this.handlePasswordChange}
                    onKeyDown={this.handleKeyPress}
                  />
                  <HelpBlock>{this.state.errorDescription}</HelpBlock>
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
