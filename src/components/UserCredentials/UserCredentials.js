import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './UserCredentials.sass'

class UserCredentials extends Component {
  render(){
    const {credentials, handleChange, error} = this.props
    return(
      <form className="user-credentials">
        <div>
          <input
            type="text"
            placeholder="name"
            name="name"
            defaultValue={credentials.name}
            onBlur={handleChange}/>
            {error == "name" && <p className="error">Wrong name!</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="e-mail"
            name="email"
            defaultValue={credentials.email}
            onBlur={handleChange}
            required/>
            {error == "email" && <p className="error">Wrong email!</p>}
        </div>
        <div>
          <input
            type="checkbox"
            //onChange={handleChange}
            disabled
            checked/>
          <p>Through slack?</p>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return state.user
}

export default connect(
  mapStateToProps
)(UserCredentials)
