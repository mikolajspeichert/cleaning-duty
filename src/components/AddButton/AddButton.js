import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './AddButton.sass'

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
