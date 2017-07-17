import React from 'react'
import style from './Header.sass'
import Navbar from '../Navbar/Navbar'

class Header extends React.Component {
  render() {
    return (
      <div className="header-root">
            <h1>Cleaning duty</h1>
            <Navbar values={["Users", "Duties"]} />
      </div>
    )
  }
}
export default Header;
