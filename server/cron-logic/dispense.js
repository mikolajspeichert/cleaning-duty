const manager = require('../data/manager');
var slack_not = require('./slack')


const findUserForDuty = (users, duty, history) =>{
  let fin = {
    user: null,
    ratio: 1.0
  }
  let code = duty.frequency
  code = code << 1
  let dutyWeek = Array(7).fill().map(() => {
    code = code >> 1
    // 0011 & 1 == 1 so its true
    // 0100 & 1 == 0 so its false
    return (code & 1)
  })
  console.log(dutyWeek)
  for(let user of users){
    console.log(user.name + " start");
    let baseDate = new Date(user.created.getTime())
    let could = 0
    let have = 0
    let error = false
    let now = new Date()

    while(baseDate.getTime() <= now.getTime()){
      if(dutyWeek[baseDate.getDay()]) could++
      baseDate.setDate(baseDate.getDate() + 1)
    }
    console.log("could: " + could)
    have = history.filter(
      (history) => history.user_id == user.id && history.duty_id == duty.id
    ).length
    console.log("have " + have);
    if(error || could == 0) continue
    if(have/could < fin.ratio) {
      fin.user = user
      fin.ratio = have/could
    }
    console.log("ratio: " + have/could);
  }
  if(!fin.user) return users[0]
  else return fin.user
}


module.exports = () => {
  let userDuties = []
  let dutyPromise = manager.getDuties()
  let userPromise = manager.getUsers()
  let historyPromise = manager.getHistory()
  Promise.all([
    dutyPromise,
    userPromise,
    historyPromise
  ]).then(response => {
    let [duties, users, history] = response
    for(let duty of duties){
      console.log(duty.name + " start");
      chosen = findUserForDuty(users, duty, history)
      if(!userDuties[chosen.id])userDuties[chosen.id] = []
      userDuties[chosen.id].push(duty)
      manager.addHistory(chosen.id, duty.id, new Date())
      console.log(chosen.name + " has been chosen");
      console.log(duty.name + " stop");
    }
    for(let id in userDuties){
      let slackuser = users.find((element) => element.id == id)
      slack_not(slackuser.slack, slackuser.name, userDuties[id])
    }
  })
}
