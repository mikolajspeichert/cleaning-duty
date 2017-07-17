import React from 'react'
import style from './Header.sass'
import Navbar from '../NavbarItem/NavbarItem'

class Header extends React.Component {
  render() {
    return (
      <div className="header-root">
            <h1>Cleaning duty</h1>
            <Navbar/>
      </div>
    )
  }
}
export default Header;
