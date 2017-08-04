import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import styles from "./UserCredentials.sass";

// Semi-smart component, if mapping state to props was made in UserPanel
// it didn't work, so I've placed it here
class UserCredentials extends Component {
  render() {
    const { credentials, handleChange, error } = this.props;
    return (
      <form className="user-credentials">
        <div>
          <input
            type="text"
            placeholder={!!credentials.name && "Name"}
            name="name"
            value={credentials.name}
            onChange={handleChange}
          />
          {error == "name" && <p className="error">Wrong name!</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder={!!credentials.email && "E-mail"}
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
          {error == "email" && <p className="error">Wrong email!</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder={!!credentials.slack && "Slack nickname"}
            name="slack"
            value={credentials.slack}
            onChange={handleChange}
          />
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return state.user;
};

export default withRouter(connect(mapStateToProps)(UserCredentials));
