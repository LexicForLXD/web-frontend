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
        fingerprint: '',
        aliases: [{
          id: '',
          name: '',
          description: ''
        }],
        architecture: '',
        size: '',
        public: false,
        state: '',
        properties: '',
        finished: false,
        hostId: ''
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
      if (obj.httpStatus !== 200) return;
      this.setState({ image: obj.jsonData })
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
              <th>Aliases</th>
              <th>Description</th>
              <th>Architecture</th>
              <th>Size</th>
              <th>Public</th>
              <th>Filename</th>
              <th>Finished</th>
              <th>Host</th>
            </tr>
          </thead>
          <tbody>
            <tr key={this.state.image.id}>
              <td>{this.state.image.aliases.map(a => a.name).join(', ')}</td>
              <td>{this.state.image.aliases[0].description}</td>
              <td>{this.state.image.architecture}</td>
              <td>{this.state.image.size}</td>
              <td>{JSON.stringify(this.state.image.public)}</td>
              <td>{this.state.image.filename}</td>
              <td>{JSON.stringify(this.state.image.finished)}</td>
              <td>{this.state.image.hostId}</td>
            </tr>
          </tbody>
        </Table>
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>Properties</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{JSON.stringify(this.state.image.properties, null, 2)}</td>
            </tr>
          </tbody>
        </Table>
        <Table bordered responsive striped>
          <thead>
            <tr>
              <th>Fingerprint</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.image.fingerprint}</td>
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
            httpGetImage={this.httpGetImage}
            httpRequest={this.props.httpRequest}
          />
        }
      </div>
    )
  }
}

export default ImageShow;
