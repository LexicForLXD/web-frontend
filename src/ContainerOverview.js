import React, { Component } from 'react';
import './App.css';
import { Table, Button } from 'react-bootstrap';

/**
 *  Container overview UI component
 */
class ContainerOverview extends Component {
  constructor(props) {
    super();
    this.state = {
      sortProperty: 'name'
    }
  }

  /** Compares two object's properties. To be used in Array.sort method */
  compareFunction = (a, b) => {
    const sortProperty = this.state.sortProperty;
    if (sortProperty !== 'hostName') {
      if (a[sortProperty] < b[sortProperty]) return -1;
      if (a[sortProperty] > b[sortProperty]) return 1;
      return 0;
    } else {
      if (a.host.name < b.host.name) return -1;
      if (a.host.name > b.host.name) return 1;
      return 0;
    }
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
                onClick={() => this.setState({ sortProperty: 'name' })}
              >
                Name
              </Button>
            </th>
            <th>
              <Button
                type="button"
                className="TableHeaderButton"
                onClick={() => this.setState({ sortProperty: 'state' })}
              >
                Status
              </Button>
            </th>
            <th>
              <Button
                type="button"
                className="TableHeaderButton"
              >
                Control
              </Button>
            </th>
            <th>
              <Button
                type="button"
                className="TableHeaderButton"
                onClick={() => this.setState({ sortProperty: 'hostName' })}
              >
                Host
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.containers instanceof Array &&
            this.props.containers.sort(this.compareFunction).map(container =>
              <tr key={container.id}>
                <td>{container.name}</td>
                <td>{container.state}</td>
                <td>
                  <Button type="button" onClick={() => this.props.httpPutContainerState(container.id, 'start')}>
                    <i className="fa fa-play"></i>
                  </Button>
                  <Button type="button" onClick={() => this.props.httpPutContainerState(container.id, 'stop')}>
                    <i className="fa fa-stop"></i>
                  </Button>
                  <Button type="button" onClick={() => this.props.httpPutContainerState(container.id, 'restart')}>
                    <i className="fa fa-repeat"></i>
                  </Button>
                </td>
                <td>{container.host.name}</td>
              </tr>
            )
          }
        </tbody>
      </Table>
    )
  }
}

export default ContainerOverview;
