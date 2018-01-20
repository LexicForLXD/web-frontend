import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';

/**
 *  Image overview UI component
 */
class ImageOverview extends Component {
  constructor(props) {
    super();
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <Table bordered responsive striped>
        <thead>
          <tr>
            <th>Fingerprint</th>
            <th>Aliases</th>
            <th>Architecture</th>
            <th>Size</th>
            <th>Public</th>
            <th>Filename</th>
            <th>Properties</th>
            <th>Finished</th>
            <th>Host</th>
          </tr>
        </thead>
        <tbody>
          {this.props.images instanceof Array &&
            this.props.images.map(image =>
              <tr key={image.id}>
                <td>{image.fingerprint}</td>
                <td>{image.aliases}</td>
                <td>{image.architecture}</td>
                <td>{image.size}</td>
                <td>{image.public}</td>
                <td>{image.filename}</td>
                <td>{image.properties}</td>
                <td>{image.finished}</td>
                <td>{image.host}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    )
  }
}

export default ImageOverview;
