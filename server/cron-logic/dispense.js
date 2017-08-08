const manager = require('../data/manager');
const notifySlack = require('./slack');

const isOnHolidays = (holidays, dateToCheck) => {
  for (const holiday of holidays) {
    if (dateToCheck > holiday.start && dateToCheck < holiday.end) return true;
  }
  return false;
};

const findUserForDuty = (users, duty, history) => {
  const fin = {
    user: null,
    ratio: 1.0,
  };
  let code = duty.frequency;
  code <<= 1;
  const dutyWeek = Array(7).fill().map(() => {
    code >>= 1;
    // 0011 & 1 == 1 so its true
    // 0100 & 1 == 0 so its false
    return code & 1;
  });
  console.log(dutyWeek);
  for (const user of users) {
    console.log(`START USER ${user.name}`);
    const baseDate = new Date(user.created.getTime());
    let could = 0;
    let have = 0;
    const error = false;
    const now = new Date();

    if (isOnHolidays(user.holidays, now)) continue;

    while (baseDate.getTime() <= now.getTime()) {
      if (dutyWeek[baseDate.getDay()]) {
        if (!isOnHolidays(user.holidays, baseDate)) could++;
      }
      baseDate.setDate(baseDate.getDate() + 1);
    }
    console.log(`COULD: ${could}`);
    have = history.filter(
      element => element.user_id == user.id && history.duty_id == duty.id).length
    console.log(`HAVE: ${have}`);
    if (error || could == 0) continue;
    if (have / could <= fin.ratio) {
      fin.user = user;
      fin.ratio = have / could;
    }
    console.log(`RATIO: ${have / could}`);
  }
  if (!fin.user) {
    for (const finusr of users) {
      if (!isOnHolidays(finusr.holidays, new Date())) return finusr;
    }
    return null;
  }
  return fin.user;
};

module.exports = () => {
  const userDuties = [];
  const dutyPromise = manager.getDuties();
  const userPromise = manager.getUsers();
  const historyPromise = manager.getHistory();
  Promise.all([dutyPromise, userPromise, historyPromise]).then(response => {
    const [duties, users, history] = response;
    for (const duty of duties) {
      console.log(`START DUTY ${duty.name}`);
      chosen = findUserForDuty(users, duty, history);
      if (!chosen) return;
      if (!userDuties[chosen.id]) userDuties[chosen.id] = [];
      userDuties[chosen.id].push(duty);
      manager.addHistory(chosen.id, duty.id, new Date());
      console.log(`CHOSEN: ${chosen.name}`);
    }
    for (const id in userDuties) {
      const slackuser = users.find(element => element.id == id);
      notifySlack(slackuser.slack, slackuser.name, userDuties[id]);
    }
  });
};
