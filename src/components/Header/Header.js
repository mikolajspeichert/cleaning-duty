import React from 'react';
import style from './Header.sass'
import Navbar from '../Navbar/Navbar'

class Header extends React.Component {
  render() {
    return (
      <div className="header-root">
            <h1>Cleaning duty</h1>
            <Navbar values={["Users", "User", "Duties"]} />
      </div>
    );
  }
}
export default Header;
//export default withStyles(style)(Header);
