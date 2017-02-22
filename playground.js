const moment = require('moment')

moment().format('MMMM Do YYYY, h:mm:ss a')


let date = {
  day:         moment().day(),
  week:        moment().week(),
  month:       moment().format('MMM'),
  isPayWeek:   moment().week() % 2 === 0,
  workWeekDay: moment().week() % 2 === 0
                 ? moment().day() + 7
                 : moment().day()


}

console.log(JSON.stringify(date, null, 2))

const { modules } = require('./index')

let { punch } = modules

punch.punch('kevin')
  .then((punch) => console.log(punch))
  .catch(e => console.error(e))
