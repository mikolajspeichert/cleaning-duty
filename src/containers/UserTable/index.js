import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchIfNeeded, removeUser } from '../App/actions'
import UserTableItem from '../../components/UserTableItem'
import AddButton from '../../components/AddButton'

// Table of users container
// On every showup is updated
// It isn't a lot of data, so there is no need for optimisation
class UserTable extends Component {
  componentWillMount() {
    const dispatch = this.props.dispatch
    dispatch(fetchIfNeeded())
  }

  handleRemove = id => {
    this.props.dispatch(removeUser(id))
  }

  render = () => {
    const users = this.props.users
    return (
      <div>
        <table>
          <tbody>
            {users.map(user =>
              <UserTableItem
                key={user.id}
                name={user.name}
                id={user.id}
                onRemove={this.handleRemove}
              />
            )}
          </tbody>
        </table>
        <AddButton />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.items,
})

export default withRouter(connect(mapStateToProps)(UserTable))
