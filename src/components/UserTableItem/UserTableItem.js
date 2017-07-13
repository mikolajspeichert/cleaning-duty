import React, { Component } from 'react';
import PropTypes from 'prop-types'


class UserTableItem extends Component{
  render = () => {
    const { name, id, onEdit } = this.props
    return(
      <tr className="user-table-item">
        <td className="item-left">{name}</td>
        <td className="item-right">
          <img src="settings-icon-black.png" alt="settings"
            onClick={()=>onEdit(id)}/>
        </td>
      </tr>
    )
  }
}

UserTableItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired
}

export default UserTableItem
