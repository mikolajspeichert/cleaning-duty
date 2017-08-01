import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import styles from "./SubmitButton.sass";

class SubmitButton extends Component {
  render() {
    const { value, onSubmit } = this.props;
    return (
      <Link className="user-submit" to="/" onClick={onSubmit}>
        {value}
      </Link>
    );
  }
}

export default SubmitButton;
