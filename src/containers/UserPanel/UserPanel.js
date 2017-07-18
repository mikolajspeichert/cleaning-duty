import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {postUser, wrongField, fieldChanged} from './actions'
import UserCredentials from '../../components/UserCredentials/UserCredentials'
import SubmitButton from '../../components/SubmitButton/SubmitButton'


class UserPanel extends Component{
  render(){
    const props = this.props
    return(
      <div>
        <UserCredentials handleChange={props.handleChange}/>
        <SubmitButton onSubmit={props.handleSubmit}/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: () => {
      dispatch(postUser())
    },
    handleChange: event => {
      event.persist()
      const value = event.target.value
      const name = event.target.name
      dispatch(fieldChanged(name, value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(UserPanel)
