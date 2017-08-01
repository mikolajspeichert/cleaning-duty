import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./DutyPicker.sass";

class DutyPicker extends Component {
  render = () => {
    if (!!this.props.days) var { days, handlePick } = this.props;
    else {
      var days = [0, 0, 0, 0, 0];
      var handlePick = () => {};
    }
    const values = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    return (
      <div
        className={
          !!this.props.days ? "picker-wrapper" : "picker-wrapper transparentish"
        }
      >
        {days.map((value, key) => {
          let css = value ? "picker-item selected" : "picker-item";
          return (
            <div
              className={css}
              key={key}
              onClick={() => handlePick(key, value)}
            >
              {values[key]}
            </div>
          );
        })}
      </div>
    );
  };
}

export default DutyPicker;
