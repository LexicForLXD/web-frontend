import React, { Component } from 'react';
import './App.css';
import { Grid, Row, Well } from 'react-bootstrap';

class Console extends Component {
  render() {
    return (
      <Well bsSize="small" className="Console">
        <Grid>
          {this.props.log.map((msg, index) =>
            <Row key={index}>
              {msg}
            </Row>
          )}
      </Grid>
    </Well>
    )
  }
}

export default Console;
