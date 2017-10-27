import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { pickNew } from './actions'
import SpecialDatePicker from '../../components/SpecialDatePicker'
import AddHoliday from '../../components/AddHoliday'

class SpecialDates extends Component {
  render() {
    let { dates, newPick, handlePick } = this.props
    return (
      <div>Someday will be done </div>
      // <div className="dates-list">
      //   {
      //     // dates.map(date => {})
      //   }
      //   {!newPick && <SpecialDatePicker onPick={handlePick} />}
      //   {/* {newPick === 1 && <AddSingleDay />} */}
      //   {newPick === 2 && <AddHoliday />}
      // </div>
    )
  }
}

const mapStateToProps = state => ({
  dates: state.dates.items,
  newPick: state.dates.new,
})

const mapDispatchToProps = dispatch => ({
  handlePick: pick => dispatch(pickNew(pick)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SpecialDates)
)
