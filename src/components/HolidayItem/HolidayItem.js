import React, { Component } from "react";
import styles from './HolidayItem.sass'

class HolidayItem extends Component {

  render = () => {
    const { holiday, onChange } = this.props
    return (
      <tr className="holiday-item">
        <td>
          <form onSubmit={e=>e.preventDefault()}>
            <input
              type="number"
              min="1"
              max="31"
              name="ds"
              value={new Date(holiday.start).getDate()}
              onChange={onChange}
            />
            -
            <input
              type="number"
              min="1"
              max="12"
              name="ms"
              value={new Date(holiday.start).getMonth()}
              onChange={onChange}
            />
            -
            <input
              type="number"
              min="2017"
              max={new Date().getFullYear() + 10}
              name="ys"
              value={new Date(holiday.start).getFullYear()}
              onChange={onChange}
            />
            <p>to</p>
            <input
              type="number"
              min="1"
              max="31"
              name="de"
              value={new Date(holiday.end).getDate()}
              onChange={onChange}
            />
            -
            <input
              type="number"
              min="1"
              max="12"
              name="me"
              value={new Date(holiday.end).getMonth()}
              onChange={onChange}
            />
            -
            <input
              type="number"
              min="2017"
              max={new Date().getFullYear() + 10}
              name="ye"
              value={new Date(holiday.end).getFullYear()}
              onChange={onChange}
            />
          </form>
        </td>
      </tr>
    )
  }
}

export default HolidayItem;
