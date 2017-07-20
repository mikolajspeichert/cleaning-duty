import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {fetchIfNeeded} from './actions'
import {Switch, Route} from 'react-router-dom'
import { withRouter } from 'react-router'
import Header from '../../components/Header/Header'
import UserTable from '../UserTable/UserTable'
import UserPanel from '../UserPanel/UserPanel'

class App extends Component {
  componentDidMount() {
    const dispatch = this.props.dispatch
    dispatch(fetchIfNeeded())
  }

  render(){
    return(
      <div>
      <Header />
      <Switch>
        <Route exact path="/" component={UserTable}/>
        <Route path="/user/:id" component={UserPanel} />
        <Route path="/user" component={UserPanel} />
      </Switch>
      </div>
    )
  }
}


export default withRouter(connect(null)(App))
