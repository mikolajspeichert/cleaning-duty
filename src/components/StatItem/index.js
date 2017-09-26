import React, { Component } from 'react'
import './style.sass'

class StatItem extends Component {
  toggleActive = () => {
    this.list.className == 'active'
      ? (this.list.className = '')
      : (this.list.className = 'active')
  }

  render = () => {
    const { item } = this.props
    return (
      <tr className="stat-item">
        <td className="item">
          <div onClick={this.toggleActive}>
            {item.duty}
          </div>
          <ul ref={u => (this.list = u)}>
            {item.users.map(user =>
              <li key={user.user}>
                <div className="user left">
                  {user.user}
                </div>
                <div className="user right">
                  {user.quantity}
                </div>
              </li>
            )}
          </ul>
        </td>
      </tr>
    )
  }
}

export default StatItem
