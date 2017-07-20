import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {postUser, wrongField, fieldChanged, reset, getUser} from './actions'
import UserCredentials from '../../components/UserCredentials/UserCredentials'
import SubmitButton from '../../components/SubmitButton/SubmitButton'


class UserPanel extends Component{

  componentWillMount(){
    if(!!this.props.match.params.id){
      this.props.handleShowup(this.props.match.params.id)
    }
  }

  componentDidMount(){
    this.forceUpdate()
  }

  componentWillUnmount(){
    this.props.handleLeave()
  }

  render(){
    const {match, credentials, handleChange, handleSubmit} = this.props
    return(
      <div>
        <UserCredentials handleChange={handleChange}/>
        <SubmitButton onSubmit={handleSubmit}/>
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
    },
    handleLeave: () => {
      dispatch(reset())
    },
    handleShowup: (id) => {
      dispatch(getUser(id))
    }
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(UserPanel))
