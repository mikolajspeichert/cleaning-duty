import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { addHoliday } from "../UserPanel/actions";
import HolidayItem from "../../components/HolidayItem/HolidayItem";
import AddHoliday from "../../components/AddHoliday/AddHoliday";

class HolidaysTable extends Component {
  handleAdd = holiday => {
    this.props.handleAdd(holiday);
    this.forceUpdate();
  };

  render = () => {
    const { holidays, handleDelete } = this.props;
    return (
      <div>
        <h3>Holidays</h3>
        <table>
          <tbody>
            {holidays.length > 0 &&
              holidays.map(holiday =>
                <HolidayItem
                  key={holiday.start}
                  holiday={holiday}
                  onDelete={handleDelete}
                />
              )}
            <AddHoliday onAdd={this.handleAdd} />
          </tbody>
        </table>
      </div>
    );
  };
}
const mapStateToProps = state => {
  return state.user.credentials;
};

const mapDispatchToProps = dispatch => {
  return {
    handleAdd: holiday => {
      dispatch(addHoliday(holiday));
    },
    handleDelete: id => {
      dispatch(deleteHoliday(id));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HolidaysTable)
);
