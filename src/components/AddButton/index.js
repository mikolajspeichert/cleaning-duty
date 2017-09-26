import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.sass'

class AddButton extends Component {
  render() {
    return (
      <Link className="add-button" to="/user">
        +
      </Link>
    )
  }
}

export default AddButton
