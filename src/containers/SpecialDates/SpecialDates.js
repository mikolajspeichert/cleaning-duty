import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import SpecialDatePicker from '../../components/SpecialDatePicker/SpecialDatePicker'

class SpecialDates extends Component {
  render() {
    let dates = this.props.dates
    return (
      <div className="dates-list">
        {
          // dates.map(date => {})
        }
        <SpecialDatePicker />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dates: state.dates,
})

export default withRouter(connect(mapStateToProps)(SpecialDates))
