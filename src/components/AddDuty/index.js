import React, { Component } from 'react'
import DutyPicker from '../DutyPicker'
import './style.sass'

class AddDuty extends Component {
  handleEnterPress = e => {
    e.persist()
    if (e.key == 'Enter') {
      this.props.onAdd(e.target.value)
      e.target.value = ''
    }
  }

  render = () =>
    <tr className="duty-table-item">
      <td className="item new">
        <form onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Add new..."
            onKeyUp={this.handleEnterPress}
          />
        </form>
        <DutyPicker />
      </td>
    </tr>
}

export default AddDuty
