import React from 'react'
import './style.sass'
import Navbar from '../../containers/Navbar'

class Header extends React.PureComponent {
  render() {
    return (
      <div className="header-root">
        <h1>Cleaning duty</h1>
        <Navbar />
      </div>
    )
  }
}
export default Header
