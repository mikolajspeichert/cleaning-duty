import { connect } from 'react-redux'
import { changeLocation } from '../../actions'
import NavbarItem from '../../components/NavbarItem/NavbarItem'
import locations from '../../locations'


const parseLocation = (loc) => {
  switch(loc){
    case locations.LOCATION_DUTIES:
      return "Duties"
    case locations.LOCATION_USERS:
    case locations.LOCATION_USER:
    default:
      return "Users"
  }
}

const backwardParse = (nav) => {
  console.log(nav)
  switch(nav){
    case "Duties":
      return locations.LOCATION_DUTIES
    case "Users":
    default:
      return locations.LOCATION_USERS
  }
}

const mapStateToProps = state => {
  let navbarItems = ["LOCATION_USERS", "LOCATION_DUTIES"].map((loc) => parseLocation(loc))
  .filter((elem, pos, arr) => arr.indexOf(elem) == pos)
  return {
    currentLocation: parseLocation(state.location),
    values: navbarItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLocationClick: location => {
      dispatch(changeLocation(backwardParse(location)))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavbarItem)
