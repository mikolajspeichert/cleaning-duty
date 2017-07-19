import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import UserTableItem from '../../components/UserTableItem/UserTableItem'
import AddButton from '../../components/AddButton/AddButton'
//import style from './UserTable.sass'

class UserTable extends Component{

  handleEdit = (id) => {
    console.log("[UserTable] handle edit of id: " + id)
  }

  render = () => {
    const users = this.props.users;
    return (
      <div>
        <table>
          <tbody>
            {users.map((user)=>
              <UserTableItem key={user.id} name={user.name} id={user.id} onEdit={this.handleEdit} />
            )}
          </tbody>
        </table>
        <AddButton />
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return{
    users: state.users.items
  }
}


export default withRouter(connect(mapStateToProps)(UserTable));
