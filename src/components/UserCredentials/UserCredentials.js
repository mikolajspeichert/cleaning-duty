import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styles from './UserCredentials.sass'

// Semi-smart component, if mapping state to props was made in UserPanel
// it didn't work, so I've placed it here
class UserCredentials extends Component {
  constructor(props) {
    super(props)
    this.toggleHours = this.toggleHours.bind(this)
  }

  toggleHours(current) {
    this.props.handleChange({
      target: {
        value: current ? '' : 14,
        name: 'reminder_hour',
      },
      persist: () => {},
    })
  }

  render() {
    const { credentials, handleChange, error } = this.props
    return (
      <form className="user-credentials">
        <div>
          <input
            type="text"
            placeholder={credentials.name ? '' : 'Name'}
            name="name"
            value={credentials.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder={credentials.email ? '' : 'E-mail'}
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder={credentials.slack ? '' : 'Slack nickname'}
            name="slack"
            value={credentials.slack}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="checkbox"
            onChange={() => this.toggleHours(credentials.reminder_hour)}
            checked={!!credentials.reminder_hour}
          />
          I want notifications {credentials.reminder_hour ? 'at' : ''}
          <input
            type="number"
            className={credentials.reminder_hour ? '' : 'hidden'}
            min="11"
            max="23"
            placeholder={credentials.reminder_hour ? '' : 'hh'}
            name="reminder_hour"
            value={credentials.reminder_hour}
            onChange={handleChange}
          />
          {credentials.reminder_hour ? ':00' : ''}
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => state.user

export default withRouter(connect(mapStateToProps)(UserCredentials))
