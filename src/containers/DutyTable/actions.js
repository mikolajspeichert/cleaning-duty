import fetch from "isomorphic-fetch";
import { DUTIES, DUTY } from "../../apilinks";
import utils from "../../utils/dutycoding";
export const RECEIVE_DUTIES = "RECEIVE_DUTIES";
export const UPDATE_DUTIES = "UPDATE_DUTIES";

// Action dispatched when fetching has begun
function receiveDuties(json) {
  return {
    type: "RECEIVE_DUTIES",
    data: json
  };
}

function updateDuty(id, frequency) {
  return {
    type: "UPDATE_DUTIES",
    id: id,
    frequency: frequency
  };
}

function fetchDuties() {
  return dispatch => {
    fetch(DUTIES, { method: "GET" })
      .then(response => response.json())
      .then(json => dispatch(receiveDuties(json)));
  };
}

export function getDuties() {
  return (dispatch, getState) => {
    return dispatch(fetchDuties());
  };
}

function update(id, frequency) {
  return dispatch => {
    dispatch(updateDuty(id, frequency));
    return fetch(DUTIES, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        update: {
          frequency: frequency
        }
      })
    }).then(response => {
      if (!!response.json().error) {
        console.error(response.json().error);
      }
    });
  };
}

function remove(id) {
  return dispatch => {
    return fetch(DUTIES + "/remove", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    }).then(response => {
      dispatch(getDuties());
      if (!!response.json().error) {
        console.error(response.json().error);
      }
    });
  };
}

function post(name) {
  console.log("posting");
  return dispatch => {
    return fetch(DUTY, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name
      })
    }).then(response => {
      dispatch(getDuties());
      if (!!response.json().error) {
        console.error(response.json().error);
      }
    });
  };
}

export function updateDuties(id, day, value) {
  return (dispatch, getState) => {
    let duty = Object.assign(
      {},
      getState().duties.find(element => {
        return element.id == id;
      })
    );
    let bit = 1 << day;
    //value is an old value !!!!!!!
    if (!value) {
      duty.frequency = duty.frequency | bit;
    } else {
      duty.frequency = duty.frequency & ~bit;
    }
    return dispatch(update(id, duty.frequency));
  };
}

export function postDuty(name) {
  return (dispatch, getState) => {
    return dispatch(post(name));
  };
}

export function removeDuty(id) {
  return (dispatch, getState) => {
    return dispatch(remove(id));
  };
}
