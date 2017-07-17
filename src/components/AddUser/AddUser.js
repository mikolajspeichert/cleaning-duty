import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './AddUser.sass'


class AddUser extends Component{
    render(){
      return(
        <div className="add-button" onClick={this.props.onAdd}>
          +
        </div>
      )
    }
}

export default AddButton
