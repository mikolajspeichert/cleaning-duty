import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import settingsBlack from './settings-icon-black.png'
import settingsProd from './settings-icon-material.png'
import styles from './UserTableItem.sass'


class UserTableItem extends Component{
  render = () => {
    const { name, id, onEdit } = this.props
    return(
      <tr className="user-table-item">
        <td className="item-left">{name}</td>
        <td className="item-right">
          <Link to={"/user/" + id}>
          <img src={settingsBlack} alt="settings" />
          </Link>
        </td>
      </tr>
    )
  }
}

UserTableItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default UserTableItem
