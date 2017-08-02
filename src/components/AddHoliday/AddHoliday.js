import React, { Component } from "react";

class AddHoliday extends Component {

  render = () => {
    return (
      <tr className="holiday-item add">
        <td>
          <form onSubmit={e=>e.preventDefault()}>
            <input
              type="number"
              min="1"
              max="31"
              onKeyUp={()=>{}}
            />
            -
            <input
              type="number"
              min="1"
              max="12"
              onKeyUp={()=>{}}
            />
            -
            <input
              type="number"
              min="2017"
              max={new Date().getFullYear() + 10}
              onKeyUp={()=>{}}
            />
            <p>to</p>
            <input
              type="number"
              min="1"
              max="31"
              onKeyUp={()=>{}}
            />
            -
            <input
              type="number"
              min="1"
              max="12"
              onKeyUp={()=>{}}
            />
            -
            <input
              type="number"
              min="2017"
              max={new Date().getFullYear() + 10}
              onKeyUp={()=>{}}
            />
          </form>
        </td>
      </tr>
    )
  }
}

export default AddHoliday;
