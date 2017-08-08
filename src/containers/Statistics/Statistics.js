import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchStats } from './actions'
import StatItem from '../../components/StatItem/StatItem'

class Statistics extends Component {
  componentWillMount = () => {
    this.props.dispatch(fetchStats())
  }

  render = () => {
    const { stats } = this.props
    return (
      <table>
        <tbody>
          {!stats.length
            ? <p>Loading...</p>
            : stats.map(d => <StatItem item={d} key={d.duty} />)}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => ({
  stats: state.stats.items,
  isFetching: state.stats.isFetching,
})

export default withRouter(connect(mapStateToProps)(Statistics))
