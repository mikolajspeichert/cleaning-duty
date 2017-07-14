import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './AddButton.sass'


class AddButton extends Component{
    render(){
      return(
        <div className="add-button" onClick={this.props.onAdd}>
          +
        </div>
      )
    }
}

export default AddButton
