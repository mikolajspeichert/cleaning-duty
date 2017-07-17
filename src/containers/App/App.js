import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {changeLocation} from '../../actions'
import {fetchIfNeeded} from './actions'
import locations from '../../locations'
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

  render(){
    console.log(this.props)
    let location = this.props.location
    let content = null

    if(location == locations.LOCATION_USERS){
      const { isFetching, items} = this.props.users
      if(isFetching){
        content = <p>Loading...</p>
      }else{
        content = <UserTable users={items} />
      }
    }else{
      content = <p>woo</p>
    }

    return(
      <div>
      <Header />
      {content}
      <AddButton onAdd={()=>{
        this.props.dispatch(changeLocation(locations.LOCATION_USER))
      }}/>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return state || {
    location: locations.LOCATION_USERS,
    users:{
      isFetching: true,
      items: []
    }
  }
}


export default connect(mapStateToProps)(App)
