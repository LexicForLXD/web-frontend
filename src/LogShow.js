import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
   * Gets called once component has mounted. Fetches logs for container.
   */
  componentDidMount () {
    this.httpGetLogs();
  }

  /**
   * Gets called when different container is clicked on sidebar.
   * Fetches logs.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.containerId !== this.props.containerId) {
      this.httpGetLogs();
    }
  }

  /** Fetches logs for container. */
  httpGetLogs = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', `/monitoring/logs/containers/${id}`, null, obj => {
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
          <Nav stacked>
            {this.state.logs.map((logfile, index) =>
              <LinkContainer to={`/monitoring/logs/containers/${this.props.containerId}/${logfile}`} key={index}>
                <NavItem>
                  <i className="fa fa-pencil"></i> {logfile}
                </NavItem>
              </LinkContainer>
            )}
          </Nav>
        }
      </div>
    )
  }
}

export default LogShow;
