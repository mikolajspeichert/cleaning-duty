import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { addHoliday, deleteHoliday } from '../UserPanel/actions'
import HolidayItem from '../../components/HolidayItem/HolidayItem'
import AddHoliday from '../../components/AddHoliday/AddHoliday'

class HolidaysTable extends Component {
  handleAdd = holiday => {
    this.props.handleAdd(holiday)
    this.forceUpdate()
  }

  handleDelete = start => {
    this.props.handleDelete(start)
    this.forceUpdate()
  }
  render = () => {
    const { holidays } = this.props
    return (
      <div>
        <h3>Holidays</h3>
        <table>
          <tbody>
            {holidays.length > 0 &&
              holidays.map(holiday =>
                <HolidayItem
                  key={holiday.start}
                  holiday={holiday}
                  onDelete={this.handleDelete}
                />
              )}
            <AddHoliday onAdd={this.handleAdd} />
          </tbody>
        </table>
      </div>
    )
  }
}
const mapStateToProps = state => state.user.credentials

const mapDispatchToProps = dispatch => ({
  handleAdd: holiday => {
    dispatch(addHoliday(holiday))
  },
  handleDelete: start => {
    dispatch(deleteHoliday(start))
  },
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HolidaysTable)
)
