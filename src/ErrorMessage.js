import React, { Component } from 'react';
import './App.css';
import { Grid, Col, Table } from 'react-bootstrap';

/**
 *  Error message UI component
 */
class ErrorMessage extends Component {
  constructor(props) {
    super();
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    if (typeof this.props.message === 'string' || this.props.message instanceof String) {
      return (
        <div className="ErrorString">{this.props.message}</div>
      )
    } else if (this.props.message !== null && typeof this.props.message === 'object') {
      return (
        <Grid fluid>
          <Col xs={10} xsOffset={1} md={8} mdOffset={2}>
            <Table className="ErrorTable" bordered condensed>
              <thead style={{ fontWeight: "bold" }}>
                <tr>
                  <th>Value</th>
                  <th>Error</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(this.props.message).map((key, index) =>
                    <tr key={index}>
                      <td>{key}</td>
                      <td>{this.props.message[key]}</td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          </Col>
        </Grid>
      )
    } else {
      return null;
    }
  }
}

export default ErrorMessage;
