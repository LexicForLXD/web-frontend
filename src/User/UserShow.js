import React, { Component } from "react";
import "../App.css";
import UserEdit from "./UserEdit.js";
import { Table, Button } from "react-bootstrap";
import queryString from "query-string";
import { Redirect } from "react-router-dom";

/**
 *  User detail view UI component
 */
class UserShow extends Component {
  constructor(props) {
    super();
    this.state = {
      editView: false,
      authorizeView: false,
      notFound: false,
      user: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        roles: [],
        isActive: null
      }
    };
  }

  /** Gets called once component has mounted. Fetches user. */
  componentDidMount() {
    this.httpGetUser();
  }

  /**
   * Gets called when different user is clicked on sidebar.
   * Fetches user.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.httpGetUser();
    }
  }

  /** Toggles edit view. */
  toggleEditView = () => {
    this.setState({ editView: !this.state.editView });
  };

  toggleAuthorizeView = () => {
    this.setState({ authorizeView: !this.state.authorizeView });
  };

  /** Fetches user. */
  httpGetUser = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest("GET", `users/${id}`, null, obj => {
      if (obj.httpStatus === 404) this.setState({ notFound: true });
      else if (obj.httpStatus === 200)
        this.setState({ notFound: false, user: obj.jsonData });
    });
  };

  /** Deletes user. */
  httpDeleteUser = () => {
    const id = queryString.parse(window.location.search).id;
    this.props.httpRequest("DELETE", `users/${id}`, null, () => {
      this.props.httpGetUsers();
      this.setState({ redirect: true });
    });
  };

  /**
   * Renders the component.
   * @returns {jsx} component html code
   */
  render() {
    return (
      <div>
        {this.state.redirect && (
          <Redirect from="/users/show" exact to="/users" />
        )}
        {this.state.notFound && <h6>User not found!</h6>}
        {!this.state.notFound && (
          <div>
            <Table bordered responsive striped>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>E-Mail</th>
                  <th>Roles</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.user.username}</td>
                  <td>{this.state.user.firstName}</td>
                  <td>{this.state.user.lastName}</td>
                  <td>{this.state.user.email}</td>
                  <td />
                  //TODO Make roles show up correctly
                  {/* <td>{user.roles.join(', ')}</td> */}
                  <td
                    style={
                      this.state.user.isActive
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    {this.state.user.isActive &&
                      (this.state.user.isActive ? "\u2713" : "\u2715")}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Button
              type="button"
              className="Button"
              onClick={() => this.toggleEditView()}
            >
              <i className="fa fa-edit" /> Edit User
            </Button>
            <Button
              type="button"
              className="Button"
              onClick={() => this.httpDeleteUser()}
            >
              <i className="fa fa-trash" /> Delete User
            </Button>
          </div>
        )}
        {!this.state.notFound &&
          this.state.editView && (
            <UserEdit
              user={this.state.user}
              httpGetUsers={this.props.httpGetUsers}
              httpRequest={this.props.httpRequest}
            />
          )}
      </div>
    );
  }
}

export default UserShow;
