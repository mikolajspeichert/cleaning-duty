import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavbarItem.sass";

class NavbarItem extends React.Component {
  render() {
    const values = this.props.values;
    const keys = Object.keys(values);
    return (
      <div>
        {keys.map(key =>
          <NavLink
            key={values[key]}
            className="button-root"
            to={key}
            activeClassName="selected"
          >
            {values[key]}
          </NavLink>
        )}
      </div>
    );
  }
}

export default NavbarItem;
