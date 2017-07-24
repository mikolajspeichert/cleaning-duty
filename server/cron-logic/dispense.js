const manager = require('../data/manager');
const async = require('async')

const findUserForDuty = (users, duty) => {
  let fin = {
    user: null,
    ratio: 1.0
  }
  let code = duty.frequency
  let dutyWeek = Array(7).fill().map(() => {
    code = code >> 1
    // 0011 & 1 == 1 so its true
    // 0100 & 1 == 0 so its false
    return (code & 1)
  })
  console.log(dutyWeek)
  for(let user of users){
      let baseDate = user.created
      let could = 0
      let have = 0
      let error = false
      let now = new Date()

      while(baseDate.getTime() <= now.getTime()){
        if(dutyWeek[baseDate.getDay()]) could++
        baseDate.setDate(baseDate.getDate() + 1)
      }
      console.log(could)
      manager.getHistoryOfUser(user.id).exec((err, res) => {
        if(err) error = true
        have = res.length
      })

      if(error || could == 0) continue
      if(could/have < fin.ratio) {
        fin.user = user
        fin.ratio = could/have
      }
  }
  if(!fin.user) return users[0]
  else return fin.user
}


module.exports = () => {
  let duties = null
  let users = null
  let usersDuties = []

  manager.getDuties().exec((err, res) => {
    if (err) return
    duties = res
    manager.getUsers().exec((err, res) => {
      if(err) return
      users = res
      for(let duty of duties){
        chosen = findUserForDuty(users, duty)
        if(!usersDuties[chosen.id]) usersDuties[chosen.id] = []
        usersDuties[chosen.id].push({
          user: chosen,
          duty: duty,
          date: new Date()
        })
        manager.addHistory(chosen.id, duty.id, new Date())
      }
    })
  })
}
