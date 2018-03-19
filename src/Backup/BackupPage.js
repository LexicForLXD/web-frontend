import React, { Component } from 'react';
import '../App.css';
import Sidebar from '../Sidebar.js';
import BackupOverview from './BackupOverview.js';
// import BackupCreate from './BackupCreate.js';
// import BackupShow from './BackupShow.js';
import { Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

/**
 *  Backup (top level) page component
 */
class BackupPage extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  /**
   * Gets called once component has mounted. Fetches containers.
   */
  componentDidMount() {
    this.props.httpGetBackups();
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <Grid>
        <Col xs={3} md={2}>
          <Sidebar
            parent="backups"
            refresh={this.props.httpGetBackups}
            overview
            create
            items={this.props.backups}
            icon={'fa fa-hdd-o'}
            select={this.select}
          />
        </Col>
        <Col xs={9} md={10}>
          <Route
            exact path="/backups"
            render={() => <BackupOverview backups={this.props.backups} />}
          />
          {/* <Route
            path="/backups/create"
            render={() => <BackupCreate
                            httpGetBackups={this.props.httpGetBackups}
                            backups={this.state.backups}
                            httpRequest={this.props.httpRequest}
                          />}
          />
          <Route
            path="/backups/show"
            render={() => <BackupShow
                            id={queryString.parse(window.location.search).id} // still needed?
                            httpGetBackups={this.props.httpGetBackups}
                            httpRequest={this.props.httpRequest}
                          />}
          /> */}
        </Col>
      </Grid>
    )
  }
}

export default BackupPage;
