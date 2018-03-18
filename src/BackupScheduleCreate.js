import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import ErrorMessage from './ErrorMessage.js';
import Select from 'react-select';

/**
 * UI component for creating a new backupSchedule
 */
class BackupScheduleCreate extends Component {

  /**
   * @param {props} props from BackupSchedulePage
   */
  constructor(props) {
    super();
    this.state = {
      name: '',
      description: '',
      executionTime: '',
      type: ''
    }
  }

  /** Form change handler */
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  /** Form change handler */
  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  }

  /** Execution time select change handler */
  handleExecutionTimeChange = selection => {
    this.setState({ executionTime: selection.value });
  }

  /** Type select change handler */
  handleTypeChange = selection => {
    this.setState({ type: selection.value });
  }

  /** Return key press handler - calls submit() */
  handleKeyPress = e => {
    if (e.keyCode === 13) {
      this.submit();
    }
  }

  /** Posts backupSchedule on form submit */
  submit = () => {
    this.httpPostBackupSchedule();
  }

  /** Posts backupSchedule */
  httpPostBackupSchedule = () => {
    let body = {
      name: this.state.name,
      description: this.state.description,
      executionTime: this.state.executionTime,
      type: this.state.type
    };
    Object.keys(body).forEach(
      key => (body[key] === null || body[key] === undefined || body[key].length) === 0 && delete body[key]
    );
    body = JSON.stringify(body);
    const callbackFunction = obj => {
      if (obj.error) {
        this.setState({
          error: obj.error.message
        });
      } else {
        this.props.httpGetBackupSchedules();
        this.setState({ redirect: true });
      }
    }
    this.props.httpRequest('POST', 'backup-schedules', body, callbackFunction);
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/backup-schedules/create" exact to="/backup-schedules" />}
        <FormGroup controlId="formName">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name.value}
            placeholder="Enter name"
            onChange={this.handleNameChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <FormGroup controlId="formDescription">
          <ControlLabel>Description</ControlLabel>
          <FormControl
            type="text"
            value={this.state.description.value}
            placeholder="Enter description"
            onChange={this.handleDescriptionChange}
            onKeyDown={this.handleKeyPress}
          />
        </FormGroup>
        <ControlLabel>Execution Time</ControlLabel>
        <Select
          name="formExecutionTime"
          value={this.state.executionTime}
          onChange={this.handleExecutionTimeChange}
          options={[
            { value: 'hourly', label: 'hourly' },
            { value: 'daily', label: 'daily' },
            { value: 'weekly', label: 'weekly' },
            { value: 'monthly', label: 'monthly' }
          ]}
        />
        <ControlLabel>Type</ControlLabel>
        <Select
          name="formType"
          value={this.state.type}
          onChange={this.handleTypeChange}
          options={[
            { value: 'full', label: 'full' },
            { value: 'incremental', label: 'incremental' },
          ]}
        />
        <Button
          type="button"
          onClick={this.submit}
        >
          Submit
        </Button>
        <ErrorMessage message={this.state.error} />
      </form>
    )
  }
}

export default BackupScheduleCreate;
