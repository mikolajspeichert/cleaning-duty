import React, { Component } from "react";
import styles from "./HolidayItem.sass";

class DeleteItem extends React.PureComponent {
  render = () => {
    return (
      <div className="delete-item" onClick={this.props.onClick}>
        DELETE
      </div>
    );
  };
}

class HolidayItem extends Component {
  constructor(props) {
    super(props);
    this.hovered = false;
  }

  render = () => {
    const { holiday } = this.props;
    return (
      <tr className="holiday-item">
        <td
          onMouseEnter={() => {
            this.hovered = true;
            this.forceUpdate();
          }}
          onMouseLeave={() => {
            this.hovered = false;
            this.forceUpdate();
          }}
        >
          {this.hovered
            ? <DeleteItem onClick={() => this.props.onDelete(holiday.start)}/>
            : <div>
                <p>{new Date(holiday.start).getDate()}</p>
                -
                <p>{new Date(holiday.start).getMonth() + 1}</p>
                -
                <p>{new Date(holiday.start).getFullYear()}</p>
                <p>to</p>
                <p>{new Date(holiday.end).getDate()}</p>
                -
                <p>{new Date(holiday.end).getMonth() + 1}</p>
                -
                <p>{new Date(holiday.end).getFullYear()}</p>
              </div>}
        </td>
      </tr>
    );
  };
}

export default HolidayItem;
