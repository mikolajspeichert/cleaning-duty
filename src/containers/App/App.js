import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchIfNeeded} from './actions'
import Header from '../../components/Header/Header'
import UserTable from '../../components/UserTable/UserTable'
import AddButton from '../../components/AddButton/AddButton'

class App extends Component {
  constructor(props){
    super(props)

  }

  componentDidMount() {
    const dispatch = this.props.dispatch
    dispatch(fetchIfNeeded())
  }

  handleAdd(){
    console.log("Add clicked")
  }

  render(){
    const { isFetching, users } = this.props
    return(
      <div>
      <Header />
      {isFetching &&
        <p>Loading...</p>
      }
      {!isFetching &&
        <UserTable users={users} />
      }
      <AddButton onAdd={this.handleAdd}/>
      </div>
    )
  }
}

App.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return state || {
    isFetching: true,
    users: []
  }
}

export default connect(mapStateToProps)(App)
