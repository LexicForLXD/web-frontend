
import React, { Component } from 'react';
import '../App.css';
import Sidebar from '../Sidebar.js';
import ProfileOverview from './ProfileOverview.js';
import ProfileCreate from './ProfileCreate.js';
import ProfileShow from './ProfileShow.js';
import { Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

/**
 *  Image (top level) page component
 */
class ProfilePage extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  /**
   * Gets called once component has mounted. Fetches profiles.
   */
  componentDidMount() {
    this.props.httpGetProfiles();
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
            parent="profiles"
            refresh={this.props.httpGetProfiles}
            overview
            create
            items={this.props.profiles}
            icon={'fa fa-gear'}
            select={this.select}
          />
        </Col>
        <Col xs={9} md={10}>
          <Route
            exact path="/profiles"
            render={() => <ProfileOverview profiles={this.props.profiles} />}
          />
          <Route
            path="/profiles/create"
            render={() => <ProfileCreate
                            httpGetProfiles={this.props.httpGetProfiles}
                            profiles={this.state.profiles}
                            httpRequest={this.props.httpRequest}
                          />}
          />
          <Route
            path="/profiles/show"
            render={() => <ProfileShow
                            id={queryString.parse(window.location.search).id}
                            httpGetProfiles={this.props.httpGetProfiles}
                            httpRequest={this.props.httpRequest}
                          />}
          />
        </Col>
      </Grid>
    )
  }
}

export default ProfilePage;
