import { connect } from 'react-redux'
import NavbarItem from '../../components/NavbarItem/NavbarItem'

const mapStateToProps = state => {
  let navbarItems = {"/": "Users", "/duties": "Duties"}
  return {
    values: navbarItems
  }
}

export default connect(
  mapStateToProps
)(NavbarItem)
