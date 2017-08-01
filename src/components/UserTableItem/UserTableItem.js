import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import settingsBlack from "./settings-icon-black.png";
//import settingsProd from './settings-icon-material.png'
//import remove from './remove-icon-material.png'
import remove from "./remove-icon-black.png";
import styles from "./UserTableItem.sass";

class UserTableItem extends Component {
  constructor(props) {
    super(props);
    this.hovered = false;
  }

  handleMouseOver = () => {
    this.hovered = true;
    this.forceUpdate();
  };

  handleMouseLeave = () => {
    this.hovered = false;
    this.forceUpdate();
  };

  render = () => {
    const { name, id, onRemove } = this.props;
    return (
      <tr className="user-table-item">
        <td
          className="item"
          onMouseEnter={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
        >
          {name}
          <Link to={"/user/" + id}>
            <img className="edit" src={settingsBlack} alt="settings" />
          </Link>
          <img
            onClick={() => onRemove(id)}
            className={this.hovered && "hovered"}
            src={remove}
            alt="remove"
          />
        </td>
      </tr>
    );
  };
}

UserTableItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default UserTableItem;
