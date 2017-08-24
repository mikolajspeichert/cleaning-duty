import React, { Component } from 'react'
import './SpecialDatePicker.sass'

var days = {
  ONE: 1,
  FEW: 2,
}

class SpecialDatePicker extends Component {
  handlePick(pick) {
    switch (pick) {
      case days.ONE:
        console.log('ONE')
        break
      case days.FEW:
        console.log('FEW')
        break
    }
  }

  render() {
    return (
      <div className="date-picker">
        <div className="entry">
          <div className="button" onClick={() => this.handlePick(days.ONE)}>
            Add one day
          </div>
          <div className="button" onClick={() => this.handlePick(days.FEW)}>
            Add multiple days
          </div>
        </div>
        <div className="filler single">
          <form onSubmit={e => e.preDefault()}>
            <input
              type="number"
              min="1"
              max="31"
              ref={i => {
                refs[inputs.STARTDAY] = i
              }}
              onKeyUp={e => this.handleKeyUp(inputs.STARTDAY, e)}
              onBlur={e => this.handleValidation(inputs.STARTDAY, e)}
            />
            -
            <input
              type="number"
              min="1"
              max="12"
              ref={i => {
                refs[inputs.STARTMONTH] = i
              }}
              onKeyUp={e => this.handleKeyUp(inputs.STARTMONTH, e)}
              onBlur={e => this.handleValidation(inputs.STARTMONTH, e)}
            />
            -
            <input
              type="number"
              min="2017"
              max={new Date().getFullYear() + 10}
              ref={i => {
                refs[inputs.STARTYEAR] = i
              }}
              onKeyUp={e => this.handleKeyUp(inputs.STARTYEAR, e)}
              onBlur={e => this.handleValidation(inputs.STARTYEAR, e)}
            />
          </form>
        </div>
      </div>
    )
  }
}

export default SpecialDatePicker
