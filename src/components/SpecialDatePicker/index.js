import React, { Component } from 'react'
import './style.sass'

var days = {
  ONE: 1,
  FEW: 2,
}

class SpecialDatePicker extends Component {
  render() {
    const { onPick } = this.props
    return (
      <div className="date-picker">
        <div className="entry">
          <div className="button" onClick={() => onPick(days.ONE)}>
            Add one day
          </div>
          <div className="button" onClick={() => onPick(days.FEW)}>
            Add multiple days
          </div>
        </div>
      </div>
    )
  }
}

export default SpecialDatePicker
