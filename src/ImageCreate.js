import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

/**
 * UI component for creating a new image.
 */
class ImageCreate extends Component {

  /**
   * @param {props} props from ImagePage
   */
  constructor(props) {
    super();
    this.state = {
      image: '',
      name: '',
      errorImage: null,
      errorName: null
    };
  }

  componentDidMount() {
    this.props.httpGetImages();
  }

  handleImageChange = e => {
    this.setState({ image: this.imageList.value });
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0 && this.state.image.length > 0) {
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
        <FormGroup controlId="formImage">
          <ControlLabel>Image</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={this.handleImageChange}
            inputRef={ hl => this.imageList = hl }
          >
            <option>...</option>
            {this.props.images instanceof Array &&
              this.props.images.map(image =>
                <option value={image.id}>{image.name}</option>
              )
            }
          </FormControl>
          <HelpBlock>
            {this.state.errorImage || (this.state.image.length < 1 &&
              'Please choose a image of which you want to create an image')
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
          disabled={this.state.name.length < 1 || this.state.image.length < 1}
          onClick={this.submit}
        >
          Submit
        </Button>
      </form>
    )
  }
}

export default ImageCreate;
