import React, { Component } from 'react';
import '../App.css';
import { Table, Button } from 'react-bootstrap';

/**
 *  Image overview UI component
 */
class ImageOverview extends Component {
  constructor(props) {
    super();
    this.state = {
      sortProperty: 'name'
    }
  }

  /** Compares two object's properties. To be used in Array.sort method */
  compareFunction = (a, b) => {
    const sortProperty = this.state.sortProperty;
    if (a[sortProperty] < b[sortProperty]) return -1;
    if (a[sortProperty] > b[sortProperty]) return 1;
    return 0;
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
            <th>
              <Button
                type="button"
                className="TableHeaderButton"
                onClick={() => this.setState({ sortProperty: 'aliases' })}
              >
                Aliases
              </Button>
            </th>
            <th>
              <Button
                type="button"
                className="TableHeaderButton"
                onClick={() => this.setState({ sortProperty: 'public' })}
              >
                Public
              </Button>
            </th>
            <th>
              <Button
                type="button"
                className="TableHeaderButton"
                onClick={() => this.setState({ sortProperty: 'filename' })}
              >
                Filename
              </Button>
            </th>
            <th>
              <Button
                type="button"
                className="TableHeaderButton"
                onClick={() => this.setState({ sortProperty: 'finished' })}
              >
                Finished
              </Button>
            </th>
            <th>
              <Button
                type="button"
                className="TableHeaderButton"
                onClick={() => this.setState({ sortProperty: 'hostId' })}
              >
                Host
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.images instanceof Array &&
            this.props.images.map(image =>
              <tr key={image.id}>
                <td>{image.aliases.map(a => a.name).join(', ')}</td>
                <td>{JSON.stringify(image.public)}</td>
                <td>{image.filename}</td>
                <td>{JSON.stringify(image.finished)}</td>
                <td>{image.hostId}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    )
  }
}

export default ImageOverview;
