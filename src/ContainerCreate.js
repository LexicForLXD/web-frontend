import React, { Component } from 'react';
import './App.css';
import { Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class ContainerCreate extends Component {
  constructor(props) {
    super();
    this.state = {
      host: '',
      type: '',
      name: '',
      ipv4: '',
      ipv6: '',
      domain_name: '',
      limitsCpu: 1,
      errorName: null,
      errorIpv4: null,
      errorIpv6: null,
      errorDomainName: null,
    };
  }

  componentDidMount() {
    this.props.httpGetHosts();
  }

  handleTypeChange = e => {
    this.setState({ type: this.typeList.value });
  }

  // handleAliasChange = e => {
  //   this.setState({ type: this.aliasList.value });
  // }

  handleHostChange = e => {
    this.setState({ host: this.hostList.value });
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  }

  handleIpv4Change = e => {
    this.setState({ ipv4: e.target.value });
  }

  handleIpv6Change = e => {
    this.setState({ ipv6: e.target.value });
  }

  handleDomainNameChange = e => {
    this.setState({ domain_name: e.target.value });
  }

  handleLimitsCpuChange = e => {
    this.setState({ limitsCpu: e.target.value });
  }

  handleKeyPress = e => {
    if (e.keyCode === 13 && this.state.name.length > 0) {
      this.submit();
    }
  }

  submit = () => {
    this.httpPostContainer();
  }

  httpPostContainer = () => {
    const body = JSON.stringify({
      host: this.state.host,
      name: this.state.name,
      ipv4: this.state.ipv4,
      ipv6: this.state.ipv6,
      domain_name: this.state.domain_name,
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
           alias: 'ubuntu/zesty/amd64'
        }
      }
      // host: {
      //    id: 44,
      //    domain_name: 'lxd-host.lleon.de',
      //    name: 'lxd-host2',
      //    port: 8443,
      //    settings: 'settings',
      //    containers: []
      // },
    });
    const callbackFunction = json => {
      if (json.errors) {
        this.setState({
          errorName: json.errors.name,
          errorIpv4: json.errors.ipv4,
          errorIpv6: json.errors.ipv6,
          errorDomainName: json.errors.domainName,
        });
      } else {
        this.props.httpGetContainers();
        this.setState({ redirect: true });
      }
    }
    this.props.httpRequest('POST', `hosts/${this.state.host}/containers?type=${this.state.type}`, body, callbackFunction);
  }

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
            <option value="ubuntu/zesty/amd64">ubuntu/zesty/amd64</option>
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
            value={this.state.domain_name.value}
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
