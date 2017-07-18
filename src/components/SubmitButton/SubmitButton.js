import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './SubmitButton.sass'

import locations from '../../locations'


class SubmitButton extends Component{
    render(){
      const {value, onSubmit} = this.props
      return(
        <div className="user-submit" onClick={onSubmit}>
          {value}
        </div>
      )
    }
}

const mapStateToProps = state => {
  let buttonTitle = state.user.type == locations.user.ADD_USER ? "ADD" : "SAVE"
  return{
    value: buttonTitle
  }
}

export default connect(
  mapStateToProps
)(SubmitButton)
