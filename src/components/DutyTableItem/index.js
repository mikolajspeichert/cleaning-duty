import React, { Component } from 'react'
import DutyPicker from '../DutyPicker'
import './style.sass'
import remove from './remove-icon-black.png'

class DutyTableItem extends Component {
  handlePick = (key, value) => {
    this.props.onEdit(key, value)
  }

  render = () => {
    const { duty, onRemove } = this.props
    return (
      <tr className="duty-table-item">
        <td className="item">
          <p>
            {duty.name}
          </p>
          <DutyPicker days={duty.days} handlePick={this.handlePick} />
          <img onClick={() => onRemove(duty.id)} src={remove} alt="remove" />
        </td>
      </tr>
    )
  }
}

export default DutyTableItem
