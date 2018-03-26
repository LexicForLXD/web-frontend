import React, {Component} from 'react';
import '../App.css';
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import ErrorMessage from '../ErrorMessage.js';
import Select from 'react-select';

/**
 * UI component for creating a new backupSchedule
 */
class BackupScheduleCreate extends Component {

    /**
     * @param {props} props from BackupSchedulePage
     */
    constructor(props) {
        super(props);
        this.state = {
            hostId: '',
            //body
            name: '',
            description: '',
            executionTime: '',
            type: '',
            destination: '',
            containerIds: []
        }
    }

    componentDidMount() {
        this.props.httpGetHosts();
        this.props.httpGetBackupDestinations();
    }


    /** Containers multi-select change handler */
    handleContainersChange = selection => {
        this.setState({containerIds: selection.map(option => option.value)});
    }

    /** Form change handler */
    handleHostChange = e => {
        this.setState({hostId: this.hostList.value});
        this.props.httpGetContainersFromHost(this.hostList.value);
    }

    /** Form change handler */
    handleDestinationChange = e => {
        this.setState({destination: this.destList.value});
    }

    /** Form change handler */
    handleNameChange = e => {
        this.setState({name: e.target.value});
    }

    /** Form change handler */
    handleDescriptionChange = e => {
        this.setState({description: e.target.value});
    }

    /** Execution time select change handler */
    handleExecutionTimeChange = selection => {
        this.setState({executionTime: selection.value});
    }

    /** Type select change handler */
    handleTypeChange = selection => {
        this.setState({type: selection.value});
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
            type: this.state.type,
            destination: Number(this.state.destination),
            containers: this.state.containerIds
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
                this.setState({redirect: true});
            }
        }
        this.props.httpRequest('POST', 'schedules', body, callbackFunction);
    }

    /**
     * Renders the component.
     * @returns {jsx} component html code
     */
    render() {
        return (
            <form>
                {this.state.redirect && <Redirect from="/backup-schedules/create" exact to="/backup-schedules"/>}
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
                        {value: 'hourly', label: 'hourly'},
                        {value: 'daily', label: 'daily'},
                        {value: 'weekly', label: 'weekly'},
                        {value: 'monthly', label: 'monthly'}
                    ]}
                />
                <ControlLabel>Type</ControlLabel>
                <Select
                    name="formType"
                    value={this.state.type}
                    onChange={this.handleTypeChange}
                    options={[
                        {value: 'full', label: 'full'},
                        {value: 'incremental', label: 'incremental'},
                    ]}
                />

                <FormGroup controlId="formHost">
                    <ControlLabel>Host</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={this.handleHostChange}
                        inputRef={hl => this.hostList = hl}
                    >
                        <option value="">...</option>
                        {this.props.hosts instanceof Array &&
                        this.props.hosts.map((host, index) =>
                            <option key={index} value={host.id}>{host.name}</option>
                        )
                        }
                    </FormControl>
                    <HelpBlock>{this.state.hostId.length < 1 && 'Please choose a host'}</HelpBlock>
                </FormGroup>


                <FormGroup controlId="formContainers">
                    <ControlLabel>Containers</ControlLabel>
                    <Select
                        multi
                        closeOnSelect={false}
                        name="formContainers"
                        value={this.state.containerIds}
                        onChange={this.handleContainersChange}
                        options={this.props.containers.map(container => {
                            return {value: container.id, label: container.name}
                        })}
                    />
                </FormGroup>

                <FormGroup controlId="formDestination">
                    <ControlLabel>Destination</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={this.handleDestinationChange}
                        inputRef={hl => this.destList = hl}
                    >
                        <option value="">...</option>
                        {this.props.backupDestinations instanceof Array &&
                        this.props.backupDestinations.map((dest, index) =>
                            <option key={index} value={dest.id}>{dest.name}</option>
                        )
                        }
                    </FormControl>
                </FormGroup>


                <Button
                    type="button"
                    onClick={this.submit}
                >
                    Submit
                </Button>
                <ErrorMessage message={this.state.error}/>
            </form>
        )
    }
}

export default BackupScheduleCreate;
