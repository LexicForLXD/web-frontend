import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl,
         Grid, Row, Col } from 'react-bootstrap';

class HostCreate extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      ipv4: '',
      ipv6: '',
      mac: '',
      settings: ''
    };
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  handleIpv4Change = e => {
    this.setState({ ipv4: e.target.value });
  }

  handleIpv6Change = e => {
    this.setState({ ipv6: e.target.value });
  }

  handleMacChange = e => {
    this.setState({ mac: e.target.value });
  }

  handleSettingsChange = e => {
    this.setState({ settings: e.target.value });
  }

  handleKeyPress = e => {
    if (e.keyCode == 13) this.submit();
  }

  submit = () => {
    // let access_token = '';
    // let refresh_token = '';
    // const url = 'http://127.0.0.1:8000/oauth/v2/token';  // Replace
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     grant_type: 'password',
    //     client_id: '2_3bcbxd9e24g0gk4swg0kwgcwg4o8k8g4g888kwc44gcc0gwwk4',
    //     client_secret: '4ok2x70rlfokc8g0wws8c8kwcokw80k44sg48goc0ok4w0so0k',
    //     username: this.state.username,
    //     password: this.state.password
    //   })
    // })
    // .then(response => response.json())
    // .then(json => {
    //   console.log('Request succeeded.');
    //   access_token = json.access_token;
    //   refresh_token = json.refresh_token;
    // })
    // .catch(error => console.log('Request failed: ', error));
  }

  render() {
    return (
      <form>
        <FormGroup controlId="formBasicText">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name.value}
            placeholder="Enter name"
            onChange={this.handleUsernameChange}
            onKeyDown={this.handleKeyPress}
          />
          <ControlLabel className="ControlLabel">IPv4 Address</ControlLabel>
          <FormControl
            type='text'
            value={this.state.ipv4.value}
            placeholder="Enter IPv4 address"
            onChange={this.ipv4Change}
            onKeyDown={this.handleKeyPress}
          />
          <ControlLabel className="ControlLabel">IPv6 Address</ControlLabel>
          <FormControl
            type='text'
            value={this.state.ipv6.value}
            placeholder="Enter IPv6 address"
            onChange={this.ipv6Change}
            onKeyDown={this.handleKeyPress}
          />
          <ControlLabel className="ControlLabel">MAC Address</ControlLabel>
          <FormControl
            type='text'
            value={this.state.mac.value}
            placeholder="Enter MAC address"
            onChange={this.macChange}
            onKeyDown={this.handleKeyPress}
          />
          <ControlLabel className="ControlLabel">Settings</ControlLabel>
          <FormControl
            type='text'
            value={this.state.settings.value}
            placeholder="Enter settings"
            onChange={this.settingsChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <Button type="button" onClick={this.submit}>Submit</Button>
      </form>
    )
  }
}

export default HostCreate;
