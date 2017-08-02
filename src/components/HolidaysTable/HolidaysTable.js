import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import HolidayItem from "../HolidayItem/HolidayItem";
import AddHoliday from "../AddHoliday/AddHoliday"

class HolidaysTable extends Component {
  render = () => {
    const { holidays } = this.props.credentials;
    return (
      <div>
        <h3>Holidays</h3>
        <table>
          <tbody>
            {holidays.length > 0 &&
              holidays.map(holiday =>
                <HolidayItem key={holiday._id} holiday={holiday} onChange={() => {}} />
              )}
            <AddHoliday />
          </tbody>
        </table>
      </div>
    );
  };
}
const mapStateToProps = state => {
  return state.user;
};

export default withRouter(connect(mapStateToProps)(HolidaysTable));
