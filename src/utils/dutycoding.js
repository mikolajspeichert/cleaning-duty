// Duty coding works like that
//  0   0   0   1   0
// mon tue wed thu fri
// That means duty should be completed every Thursday
// So it works with a bitwise operators
// 01001 == 17
// min is 0, max is 31
const mapCodeToSchedule = duties => {
  return Object.values(duties).map(duty => {
    if (duty.frequency > 31 || duty.frequency < 0) {
      console.error("WRONG DUTY CODE");
      return null;
    }
    var prop = Object.assign({}, duty);
    let code = prop.frequency;
    let schedule = Array(5).fill();
    code = code << 1;
    prop.days = schedule.map(() => {
      code = code >> 1;
      // 0011 & 1 == 1 so its true
      // 0100 & 1 == 0 so its false
      return code & 1;
    });
    return prop;
  });
};

const mapScheduleToCode = duty => {
  let code = 0;
  duty.days.map(day => {
    code = code << 1;
    if (day) code = code | 1;
  });
  return code;
};

export default {
  mapCodeToSchedule,
  mapScheduleToCode
};
