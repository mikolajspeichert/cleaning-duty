import React, { Component } from 'react';
import PropTypes from 'prop-types'
import DutyPicker from '../DutyPicker/DutyPicker'
import styles from './DutyTableItem.sass'

class DutyTableItem extends Component{

  handlePick = (key, value) => {
    this.props.handleEdit(key, value)
  }

  render = () => {
    const {duty} = this.props
    return(
    <tr className="duty-table-item">
      <td className="item">
        <p>{duty.name}</p>
        <DutyPicker days={duty.days} handlePick={this.handlePick} />
      </td>
    </tr>
    )
  }
}

export default DutyTableItem
