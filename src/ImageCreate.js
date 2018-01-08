import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class ImageCreate extends Component {
  constructor(props) {
    super();
    this.state = {
      container: '',
      name: '',
      errorContainer: null,
      errorName: null
    };
  }

  componentDidMount() {
    this.props.httpGetContainers();
  }

  handleContainerChange = e => {
    this.setState({ container: this.containerList.value });
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0 && this.state.container.length > 0) {
      this.submit();
    }
  }

  submit = () => {
    this.httpPostImage();
  }

  httpPostImage = () => {
    const body = JSON.stringify({
      name: this.state.name,
      ipv4: this.state.ipv4,
      ipv6: this.state.ipv6,
      domain_name: this.state.domain_name,
      mac: this.state.mac,
      settings: this.state.settings
    });
    const callbackFunction = obj => {
      if (obj.jsonData.errors) {
        this.setState({
          errorName: obj.jsonData.errors.name,
          errorIpv4: obj.jsonData.errors.ipv4,
          errorIpv6: obj.jsonData.errors.ipv6,
          errorDomainName: obj.jsonData.errors.domainName,
          errorMac: obj.jsonData.errors.mac,
          errorSettings: obj.jsonData.errors.settings
        });
      } else {
        this.props.httpGetImages();
        this.setState({ redirect: true });
      }
    }
    this.props.httpRequest('POST', 'images', body, callbackFunction);
  }

  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/images/create" exact to="/images" />}
        <FormGroup controlId="formContainer">
          <ControlLabel>Container</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={this.handleContainerChange}
            inputRef={ hl => this.containerList = hl }
          >
            <option>...</option>
            {this.props.containers instanceof Array &&
              this.props.containers.map(container =>
                <option value={container.id}>{container.name}</option>
              )
            }
          </FormControl>
          <HelpBlock>
            {this.state.errorContainer || (this.state.container.length < 1 &&
              'Please choose a container of which you want to create an image')
            }
          </HelpBlock>
        </FormGroup>
        <FormGroup controlId="formName" validationState={this.state.errorName ? 'error' : null}>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name.value}
            placeholder="Enter name"
            onChange={this.handleNameChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorName || (this.state.name.length < 1 && 'Please enter a name')}</HelpBlock>
        </FormGroup>
        <Button
          type="button"
          disabled={this.state.name.length < 1 || this.state.container.length < 1}
          onClick={this.submit}
        >
          Submit
        </Button>
      </form>
    )
  }
}

export default ImageCreate;
