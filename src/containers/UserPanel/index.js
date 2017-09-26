import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { postUser, fieldChanged, reset, getUser } from './actions'
import UserCredentials from '../../components/UserCredentials'
import HolidaysTable from '../HolidaysTable'
import SubmitButton from '../../components/SubmitButton'

// User panel container
// If no match parameters given, it works as an 'add new user'
// If a match parameter id is present, works as an 'edit user'
class UserPanel extends Component {
  // checking match params
  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.handleShowup(this.props.match.params.id)
    }
  }

  // resets on leave
  componentWillUnmount() {
    this.props.handleLeave()
  }

  render() {
    const { match, handleChange, handleSubmit } = this.props
    let value = 'ADD'
    if (match.params.id) {
      value = 'UPDATE'
    }
    return (
      <div>
        <UserCredentials handleChange={handleChange} />
        {match.params.id && <HolidaysTable />}
        <SubmitButton value={value} onSubmit={handleSubmit} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleSubmit: () => {
    dispatch(postUser())
  },
  handleChange: event => {
    event.persist()
    const value = event.target.value
    const name = event.target.name
    dispatch(fieldChanged(name, value))
  },
  handleLeave: () => {
    dispatch(reset())
  },
  handleShowup: id => {
    dispatch(getUser(id))
  },
})

export default withRouter(connect(null, mapDispatchToProps)(UserPanel))
