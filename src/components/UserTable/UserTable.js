import React, { Component } from 'react';
import PropTypes from 'prop-types'
import UserTableItem from '../UserTableItem/UserTableItem'

class UserTable extends Component{

  handleEdit = (id) => {
    console.log("[UserTable] handle edit")
  }

  render = () => {
    const users = this.props.users;
    return (
      <table>
        <tbody>
        {users.map((user)=>
          <UserTableItem key={user.id} name={user.name} id={user.id} onEdit={this.handleEdit} />
        )}
      </tbody>
      </table>
    )
  }
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired
}

export default UserTable;
