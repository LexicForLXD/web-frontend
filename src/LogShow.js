import React, { Component } from 'react';
import './App.css';
import { Table, Button } from 'react-bootstrap';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

/**
 *  Log detail view UI component
 */
class LogShow extends Component {
  constructor(props) {
    super();
    this.state = {
      notFound: false,
      logs: []
    }
  }

  /**
   * Gets called once component has mounted. Fetches log.
   */
  componentDidMount () {
    this.httpGetLog();
  }

  /**
   * Gets called when different log is clicked on sidebar.
   * Fetches log.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.containerId !== this.props.containerId) {
      this.httpGetLog();
    }
  }

  /** Fetches log. */
  httpGetLog = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', `/monitoring/logs/containers/${this.props.containerId}`, null, obj => {  // query container id instead?
      if (obj.httpStatus === 404)
        this.setState({ notFound: true })
      else
        this.setState({ notFound: false, logs: obj.jsonData.logs });
    });
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <div>
        {this.state.redirect && <Redirect from="/logs/show" exact to="/logs" />}
        {this.state.notFound &&
          <h6>No logs found for the selected container!</h6>
        }
        {!this.state.notFound &&
          <Table bordered responsive striped>
            <thead>
              <tr>
                <th>logs</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.logs}</td>
              </tr>
            </tbody>
          </Table>
        }
      </div>
    )
  }
}

export default LogShow;
