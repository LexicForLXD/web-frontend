import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

/**
 * UI component for creating a new container
 */
class ContainerCreate extends Component {

  /**
   * @param {props} props from ContainerPage
   */
  constructor(props) {
    super();
    this.state = {
      aliases: [],
      alias: '',
      host: '',
      type: '',
      name: '',
      ipv4: '',
      ipv6: '',
      domainName: '',
      limitsCpu: 1,
      errorName: null,
      errorIpv4: null,
      errorIpv6: null,
      errorDomainName: null,
    };
  }

  /**
   * Gets called once component has mounted. Fetches hosts and aliases.
   */
  componentDidMount() {
    this.props.httpGetHosts();
    this.httpGetAliases();
  }

C
  handleTypeChange = e => {
    this.setState({ type: this.typeList.value });
  }

  /** Form change handler */
  handleAliasChange = e => {
    this.setState({ alias: this.aliasList.value });
  }

  /** Form change handler */
  handleHostChange = e => {
    this.setState({ host: this.hostList.value });
  }

  /** Form change handler */
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  /** Form change handler */
  handleIpv4Change = e => {
    this.setState({ ipv4: e.target.value });
  }

  /** Form change handler */
  handleIpv6Change = e => {
    this.setState({ ipv6: e.target.value });
  }

  /** Form change handler */
  handleDomainNameChange = e => {
    this.setState({ domainName: e.target.value });
  }

  /** Form change handler */
  handleLimitsCpuChange = e => {
    this.setState({ limitsCpu: e.target.value });
  }

  /** Return key press handler - calls submit()*/
  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0) {
      this.submit();
    }
  }

  /** Posts container on form submit */
  submit = () => {
    this.httpPostContainer();
  }

  /** Fetches aliases */
  httpGetAliases = () => {
    const url = 'corsproxy?url=https://uk.images.linuxcontainers.org:8443/1.0/images/aliases';
    this.props.httpRequest('GET', url, null, obj => {
      // obj.jsonData.sort(this.compareName);
      const aliases = obj.jsonData.metadata.filter(a => !a.endsWith('/default'));
      this.setState({ aliases: aliases });
    });
  }

  /** Posts container */
  httpPostContainer = () => {
    const body = JSON.stringify({
      host: this.state.host,
      name: this.state.name,
      ipv4: this.state.ipv4,
      ipv6: this.state.ipv6,
      domainName: this.state.domainName,
      // limitsCpu: this.state.limitsCpu
      settings: {
        name: this.state.name,
        architecture: 'x86_64',
        profiles: [
           'default'
        ],
        ephermeral: false,
        config: {
           'limits.cpu': 1
        },
        devices: {
           root: {
               path: '/',
               type: 'disk',
               pool: 'default'
           }
        },
        source: {
           'type': 'image',
           mode: 'pull',
           server: 'https://images.linuxcontainers.org:8443',
           protocol: 'lxd',
           alias: this.state.alias
        }
      }
      // host: {
      //    id: 44,
      //    domainName: 'lxd-host.lleon.de',
      //    name: 'lxd-host2',
      //    port: 8443,
      //    settings: 'settings',
      //    containers: []
      // },
    });
    const callbackFunction = obj => {
      if (obj.jsonData.errors) {
        this.setState({
          errorName: obj.jsonData.errors.name,
          errorIpv4: obj.jsonData.errors.ipv4,
          errorIpv6: obj.jsonData.errors.ipv6,
          errorDomainName: obj.jsonData.errors.domainName,
        });
      } else {
        this.props.httpGetContainers();
        this.setState({ redirect: true });
      }
    }
    this.props.httpRequest('POST', `hosts/${this.state.host}/containers?type=${this.state.type}`, body, callbackFunction);
  }

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <form>
        {this.state.redirect && <Redirect from="/containers/create" exact to="/containers" />}
        <FormGroup controlId="formType">
          <ControlLabel>Type</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={this.handleTypeChange}
            inputRef={ tl => this.typeList = tl }
          >
            <option value="none">None</option>
            <option value="image">Image</option>
            <option value="copy">Copy</option>
            <option value="migrate">Migrate</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formAlias">
          <ControlLabel>Alias</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={this.handleAliasChange}
            inputRef={ list => this.aliasList = list }
          >
            <option>...</option>
            {this.state.aliases instanceof Array &&
              this.state.aliases.map(alias =>
                <option value={alias}>{alias}</option>
              )
            }
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formLimitsCpu">
          <ControlLabel>CPU Limit</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={this.handleLimitsCpuChange}
            inputRef={ list => this.limitsCpuList = list }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formHost">
          <ControlLabel>Host</ControlLabel>
          <FormControl
            componentClass="select"
            onChange={this.handleHostChange}
            inputRef={ hl => this.hostList = hl }
          >
            <option>...</option>
            {this.props.hosts instanceof Array &&
              this.props.hosts.map(host =>
                <option value={host.id}>{host.name}</option>
              )
            }
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formName" validationState={this.state.errorName ? 'error' : null}>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name.value}
            placeholder="Enter name"
            onChange={this.handleNameChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorName || (this.state.name.length < 1 && 'Please enter a name')}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formIpv4" validationState={this.state.errorIpv4 ? 'error' : null}>
          <ControlLabel className="ControlLabel">IPv4 Address</ControlLabel>
          <FormControl
            type='text'
            value={this.state.ipv4.value}
            placeholder="Enter IPv4 address"
            onChange={this.handleIpv4Change}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorIpv4}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formIpv6" validationState={this.state.errorIpv6 ? 'error' : null}>
          <ControlLabel className="ControlLabel">IPv6 Address</ControlLabel>
          <FormControl
            type='text'
            value={this.state.ipv6.value}
            placeholder="Enter IPv6 address"
            onChange={this.handleIpv6Change}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorIpv6}</HelpBlock>
        </FormGroup>
        <FormGroup controlId="formDomainName" validationState={this.state.errorDomainName ? 'error' : null}>
          <ControlLabel className="ControlLabel">Domain Name</ControlLabel>
          <FormControl
            type='text'
            value={this.state.domainName.value}
            placeholder="Enter domain name"
            onChange={this.handleDomainNameChange}
            onKeyDown={this.handleKeyPress}
          />
          <HelpBlock>{this.state.errorDomainName}</HelpBlock>
        </FormGroup>
        <Button
          type="button"
          disabled={this.state.name.length < 1}
          onClick={this.submit}
        >
          Submit
        </Button>
      </form>
    )
  }
}

export default ContainerCreate;
