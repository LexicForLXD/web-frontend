import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import ImageOverview from './ImageOverview.js';
import ImageCreate from './ImageCreate.js';
import ImageShow from './ImageShow.js';
import { Grid, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import queryString from 'query-string';

/**
 *  Image (top level) page component
 */
class ImagePage extends Component {
  constructor(props) {
    super();
    this.state = {};
  }

  /**
   * Gets called once component has mounted. Fetches images.
   */
  componentDidMount() {
    this.props.httpGetImages();
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
            image
            parent="images"
            refresh={this.props.httpGetImages}
            overview
            create
            items={this.props.images}
            icon={'fa fa-camera'}
            select={this.select}
          />
        </Col>
        <Col xs={9} md={10}>
          <Route
            exact path="/images"
            render={() => <ImageOverview images={this.props.images} />}
          />
          <Route
            path="/images/create"
            render={() => <ImageCreate
                            hosts={this.props.hosts}
                            httpGetHosts={this.props.httpGetHosts}
                            httpGetImages={this.props.httpGetImages}
                            images={this.state.images}
                            httpRequest={this.props.httpRequest}
                            httpGetContainers={this.props.httpGetContainers}
                            containers={this.props.containers}
                          />}
          />
          <Route
            path="/images/show"
            render={() => <ImageShow
                            id={queryString.parse(window.location.search).id}
                            httpGetImages={this.props.httpGetImages}
                            httpRequest={this.props.httpRequest}
                          />}
          />
        </Col>
      </Grid>
    )
  }
}

export default ImagePage;
