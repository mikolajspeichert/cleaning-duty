import React from 'react';
import styles from './Navbar.sass';


class Navbar extends React.Component {
  handleClick = (value) => {
    console.log(value + " clicked!");
  }

  render(){
    const vals = this.props.values;
    return (
      <div>{vals.map((value) =>
        <div key={value} className="button-root" onClick={() => this.handleClick(value)}>
          <p>{value}</p>
        </div>)}
      </div>
    );
  }
}

export default Navbar;
