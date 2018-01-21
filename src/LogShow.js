import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { Grid, Col, Nav, NavItem, Well } from 'react-bootstrap';

/**
 *  Log detail view UI component
 */
class LogShow extends Component {
  constructor(props) {
    super();
    this.state = {
      logsNotFound: false,
      logNotFound: false,
      logs: [],
      logText: ''
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
        this.setState({ logsNotFound: true })
      else if (obj.httpStatus === 200)
        this.setState({ logsNotFound: false, logs: obj.jsonData.logs });
    });
  }

  /** Fetches log. */
  httpGetLog = log => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest('GET', `/monitoring/logs/containers/${id}/${log}`, null, obj => {
      if (obj.httpStatus === 404)
        this.setState({ logNotFound: true })
      else if (obj.httpStatus === 200) 
        this.setState({ logNotFound: false, log: obj.jsonData });
    });

    fetch(`/monitoring/logs/containers/${id}/${this.state.log}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': `Bearer ${this.props.accessToken}`
      }
    })
    .then(response => {
      console.log('Request response: ', response);
      if (response.status === 401) {
        this.props.logout();  // TODO try using refresh token before logging out
        Promise.reject();
      };
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('text/plain'))
        this.setState({ logText: response });
      else
        throw new Error('No text/plain content type!');
    })
    .catch(error => {
      console.log('Request failed: ', error.message);
      this.setState({ logText: '' });
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
        {this.state.logsNotFound &&
          <h6>No logs found for the selected container!</h6>
        }
        {this.state.logNotFound &&
          <h6>Log not found!</h6>
        }
        {!this.state.logsNotFound &&
          <Grid>
            <Col xs={9} md={10}>
              <Well bsSize="small" className="LogText">
                {this.state.logText}
              </Well>
            </Col>
            <Col xs={3} md={2}>
              <div className="LogSidebar">
                <Nav stacked>
                  {this.state.logs.map(log =>
                    <Nav bsStyle="pills" onSelect={log => this.httpGetLog(log)}>
                      <NavItem eventKey={log}>
                        <i className="fa fa-pencil"></i> {log}
                      </NavItem>
                    </Nav>
                  )}
                </Nav>
              </div>
            </Col>
          </Grid>
        }
      </div>
    )
  }
}

export default LogShow;
