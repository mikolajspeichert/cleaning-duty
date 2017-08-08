import React, { Component } from "react";
import validate from "../../utils/datevalidation";
const inputs = {
  STARTDAY: 0,
  STARTMONTH: 1,
  STARTYEAR: 2,
  ENDDAY: 3,
  ENDMONTH: 4,
  ENDYEAR: 5
};

var refs = [];

class AddHoliday extends Component {
  showHint = () => {
    this.hint.className = "hint visible";
  };

  constructDates = () => {
    let start = new Date();
    start.setHours(7);
    start.setMinutes(0);
    start.setDate(refs[inputs.STARTDAY].value);
    start.setMonth(refs[inputs.STARTMONTH].value - 1);
    start.setYear(refs[inputs.STARTYEAR].value);
    let end = new Date(0);
    end.setDate(refs[inputs.ENDDAY].value);
    end.setMonth(refs[inputs.ENDMONTH].value - 1);
    end.setYear(refs[inputs.ENDYEAR].value);
    this.props.onAdd({ end: end.toISOString(), start: start.toISOString() });
    for (let ref of refs) ref.value = "";
    refs[0].focus();
    this.hint.className = "hint";
  };

  handleKeyUp = (keyType, e) => {
    e.persist();
    if (e.key == "Tab" || e.key == "Shift") return;
    if (e.key == "Enter") {
      for (let ref of refs) {
        ref.blur();
        if (ref.className == "error") {
          ref.focus();
          return;
        }
      }
      this.constructDates();
    }
    let val = e.target.value;
    switch (keyType) {
      case inputs.STARTDAY:
        if (val.length == 2) refs[keyType + 1].focus();
        break;
      case inputs.STARTMONTH:
        if (val.length == 2) refs[keyType + 1].focus();
        break;
      case inputs.STARTYEAR:
        if (val.length == 4) refs[keyType + 1].focus();
        break;
      case inputs.ENDDAY:
        if (val.length == 2) refs[keyType + 1].focus();
        break;
      case inputs.ENDMONTH:
        if (val.length == 2) refs[keyType + 1].focus();
        break;
      case inputs.ENDYEAR:
        if (val.length == 4) {
          this.handleValidation(keyType, e);
          this.showHint();
        }
        break;
    }
  };

  handleValidation = (keyType, e) => {
    e.persist();
    const val = e.target.value;
    switch (keyType) {
      case inputs.STARTDAY:
      case inputs.ENDDAY:
        if (!validate.day(val)) refs[keyType].className = "error";
        else refs[keyType].className = "";
        break;
      case inputs.STARTMONTH:
      case inputs.ENDMONTH:
        if (!validate.month(val)) refs[keyType].className = "error";
        else refs[keyType].className = "";
        if (!validate.day(refs[keyType - 1].value, val))
          refs[keyType - 1].className = "error";
        else refs[keyType - 1].className = "";
        break;
      case inputs.STARTYEAR:
      case inputs.ENDYEAR:
        if (!validate.year(val)) refs[keyType].className = "error";
        else refs[keyType].className = "";
        if (
          !validate.day(refs[keyType - 2].value, refs[keyType - 1].value, val)
        )
          refs[keyType - 2].className = "error";
        else refs[keyType - 2].className = '';
        break;
    }
  };

  render = () => {
    return (
      <tr className="holiday-item add">
        <td>
          <form onSubmit={e => e.preDefault()}>
            <input
              type="number"
              min="1"
              max="31"
              ref={i => {
                refs[inputs.STARTDAY] = i;
              }}
              onKeyUp={e => this.handleKeyUp(inputs.STARTDAY, e)}
              onBlur={e => this.handleValidation(inputs.STARTDAY, e)}
            />
            -
            <input
              type="number"
              min="1"
              max="12"
              ref={i => {
                refs[inputs.STARTMONTH] = i;
              }}
              onKeyUp={e => this.handleKeyUp(inputs.STARTMONTH, e)}
              onBlur={e => this.handleValidation(inputs.STARTMONTH, e)}
            />
            -
            <input
              type="number"
              min="2017"
              max={new Date().getFullYear() + 10}
              ref={i => {
                refs[inputs.STARTYEAR] = i;
              }}
              onKeyUp={e => this.handleKeyUp(inputs.STARTYEAR, e)}
              onBlur={e => this.handleValidation(inputs.STARTYEAR, e)}
            />
            <p>to</p>
            <input
              type="number"
              min="1"
              max="31"
              ref={i => {
                refs[inputs.ENDDAY] = i;
              }}
              onKeyUp={e => this.handleKeyUp(inputs.ENDDAY, e)}
              onBlur={e => this.handleValidation(inputs.ENDDAY, e)}
            />
            -
            <input
              type="number"
              min="1"
              max="12"
              ref={i => {
                refs[inputs.ENDMONTH] = i;
              }}
              onKeyUp={e => this.handleKeyUp(inputs.ENDMONTH, e)}
              onBlur={e => this.handleValidation(inputs.ENDMONTH, e)}
            />
            -
            <input
              type="number"
              min="2017"
              max={new Date().getFullYear() + 10}
              ref={i => {
                refs[inputs.ENDYEAR] = i;
              }}
              onKeyUp={e => this.handleKeyUp(inputs.ENDYEAR, e)}
              onBlur={e => this.handleValidation(inputs.ENDYEAR, e)}
            />
            <p
              ref={p => {
                this.hint = p;
              }}
              className="hint"
            >
              push enter!
            </p>
          </form>
        </td>
      </tr>
    );
  };
}

export default AddHoliday;
