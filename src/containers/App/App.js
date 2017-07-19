import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {changeLocation} from '../../actions'
import {fetchIfNeeded} from './actions'
import {Switch, Route} from 'react-router-dom'
import { withRouter } from 'react-router'
import locations from '../../locations'
import Header from '../../components/Header/Header'
import UserTable from '../UserTable/UserTable'
import UserPanel from '../UserPanel/UserPanel'

class App extends Component {
  constructor(props){
    super(props)

  }

  componentDidMount() {
    const dispatch = this.props.dispatch
    dispatch(fetchIfNeeded())
  }

  render(){
    let location = this.props.location
    let content = null
    if(location == locations.LOCATION_USERS){
      const { isFetching, items} = this.props.users
      if(isFetching){
        content = <p>Loading...</p>
      }else{
        content = [<UserTable users={items} key="table"/>,
        ]
      }
    }else{
      content = <UserPanel />
    }

    return(
      <div>
      <Header />
      <Switch>
        <Route exact path="/" component={UserTable}/>
        <Route path="/user/new" component={UserPanel} />
      </Switch>
      </div>
    )
  }
}

//
// const mapStateToProps = state => {
//   return state || {
//     location: locations.LOCATION_USERS,
//     users:{
//       isFetching: true,
//       items: []
//     }
//   }
// }


export default withRouter(connect(null)(App))
