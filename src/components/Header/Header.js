import React from 'react';
import style from './Header.sass'
import Button from '../Button/Button'

class Header extends React.Component {
  render() {
    return (
      <div className="header-root">
            <h1>Cleaning duty</h1>
            <div>
              <Button value="test" />
              <Button value="test 1" />
              <Button value="test 2" />
              <Button value="test 3" />
            </div>
      </div>
    );
  }
}
export default Header;
//export default withStyles(style)(Header);
