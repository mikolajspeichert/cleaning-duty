import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getDuties, updateDuties } from './actions'
import utils from '../../utils/dutycoding'
import DutyTableItem from '../../components/DutyTableItem/DutyTableItem'

class DutyTable extends Component{

  componentWillMount = () => {
    this.props.dispatch(getDuties())
  }

  render = () => {
    const {duties, dispatch} = this.props
    return(
      <div>
        <table>
          <tbody>
            {
              !duties ? <p>Loading...</p> : duties.map((duty) =>
                <DutyTableItem
                  duty={duty}
                  key={duty.id}
                  handleEdit={(day, value)=>{
                    dispatch(updateDuties(duty.id, day, value))
                  }
                  } />
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}


const mapStateToProps = state => {
  utils.mapCodeToSchedule(state.duties)
  return {
    duties: utils.mapCodeToSchedule(state.duties)
  }
}

export default withRouter(connect(mapStateToProps)(DutyTable))
