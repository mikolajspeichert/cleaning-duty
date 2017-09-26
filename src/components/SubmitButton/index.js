import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './style.sass'

class SubmitButton extends Component {
  render() {
    const { value, onSubmit } = this.props
    return (
      <Link className="user-submit" to="/" onClick={onSubmit}>
        {value}
      </Link>
    )
  }
}

export default SubmitButton
