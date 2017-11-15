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

  submit = () => {
    let access_token = '';
    let refresh_token = '';
    const url = 'http://127.0.0.1:8000/oauth/v2/token';  // Replace
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'password',
        client_id: '2_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4',
        client_secret: '4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k',
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log('Request succeeded.')
      access_token = json.access_token;
      refresh_token = json.refresh_token;
    })
    .catch(error => console.log('Request failed: ', error));
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <Button
          type="button"
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
