import React from 'react';
import styles from './NavbarItem.sass';


class NavbarItem extends React.Component {

  render(){
    console.log(this.props)
    const {values, onLocationClick} = this.props;
    return (
      <div>{values.map((value) =>
        <div key={value} className="button-root" onClick={onLocationClick}>
          <p>{value}</p>
        </div>)}
      </div>
    );
  }
}

export default NavbarItem;
