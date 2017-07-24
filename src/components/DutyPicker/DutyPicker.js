import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './DutyPicker.sass'

class DutyPicker extends Component{
  render = () => {
    const {days, handlePick } = this.props
    const values = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    return(
      <div className="picker-wrapper">
        {days.map((value, key) =>{
          let css = value ? "picker-item selected" : "picker-item"
          return <div className={css} key={key} onClick={() => handlePick(key, value)} >
            {values[key]}
          </div>
        })}
      </div>
    )
  }
}

export default DutyPicker
