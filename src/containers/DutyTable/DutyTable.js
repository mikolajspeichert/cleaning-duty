import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getDuties, updateDuties, postDuty, removeDuty } from './actions'
import utils from '../../utils/dutycoding'
import DutyTableItem from '../../components/DutyTableItem/DutyTableItem'
import AddDuty from '../../components/AddDuty/AddDuty'

class DutyTable extends Component {
  componentWillMount = () => {
    this.props.dispatch(getDuties())
  }

  handleAdd = name => {
    this.props.dispatch(postDuty(name))
  }

  render = () => {
    const { duties, dispatch } = this.props
    return (
      <div>
        <table>
          <tbody>
            {!duties
              ? <p>Loading...</p>
              : duties.map(duty =>
                  <DutyTableItem
                    duty={duty}
                    key={duty.id}
                    onEdit={(day, value) => {
                      dispatch(updateDuties(duty.id, day, value))
                    }}
                    onRemove={id => {
                      dispatch(removeDuty(id))
                    }}
                  />
                )}
            <AddDuty onAdd={this.handleAdd} />
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  utils.mapCodeToSchedule(state.duties)
  return {
    duties: utils.mapCodeToSchedule(state.duties),
  }
}

export default withRouter(connect(mapStateToProps)(DutyTable))
