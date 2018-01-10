import React, { Component } from 'react';
import './App.css';
import ImageEdit from './ImageEdit.js';
import { Table, Button } from 'react-bootstrap';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

/**
 *  Image detail view UI component
 */
class ImageShow extends Component {
  constructor(props) {
    super();
    this.state = {
      editView: false,
      image: {
        id: '',
        name: '',
        ipv4: '',
        ipv6: '',
        domain_name: '',
        mac: '',
        settings: ''
      }
    }
  }

  /**
   * Gets called once component has mounted. Fetches image.
   */
  componentDidMount () {
    this.httpGetImage();
  }

  /**
   * Gets called when different image is clicked on sidebar.
   * Fetches image.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.httpGetImage();
    }
  }

  /** Toggles edit view. */
  toggleEditView = () => {
    this.setState({ editView: !this.state.editView });
  }

  /** Fetches image. */
  httpGetImage = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', `images/${id}`, null, obj => {
      this.setState({
        image: obj.jsonData
      })
    });
  }

  /** Deletes image. */
  httpDeleteImage = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('DELETE', `images/${id}`, null, () => {
        this.props.httpGetImages();
        this.setState({ redirect: true });
      }
    );
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <div>
        {this.state.redirect && <Redirect from="/images/show" exact to="/images" />}
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>IPv4</th>
              <th>IPv6</th>
              <th>Domain Name</th>
              <th>MAC</th>
              <th>Settings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.image.name}</td>
              <td>{this.state.image.ipv4}</td>
              <td>{this.state.image.ipv6}</td>
              <td>{this.state.image.domain_name}</td>
              <td>{this.state.image.mac}</td>
              <td>{this.state.image.settings}</td>
            </tr>
          </tbody>
        </Table>
        <Button
          type="button"
          className="Button"
          onClick={() => this.toggleEditView()}
        >
          <i className="fa fa-edit"></i> Edit Image
        </Button>
        <Button
          type="button"
          className="Button"
          onClick={() => this.httpDeleteImage()}
        >
          <i className="fa fa-trash"></i> Delete Image
        </Button>
        {this.state.editView &&
          <ImageEdit
            image={this.state.image}
            httpGetImages={this.props.httpGetImages}
            httpRequest={this.props.httpRequest}
          />
        }
      </div>
    )
  }
}

export default ImageShow;
