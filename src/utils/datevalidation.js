
const day = (d, month = 0, year = 0) => {
  month = parseInt(month)
  if(d <= 0) return false
  switch(month){
    case 4:
    case 6:
    case 9:
    case 11:
    return d <= 30
    case 2:
    return year % 4 == 0 ? (d <= 29) : (d <= 28)
    default:
    return d <= 31
  }
}

const month = (m) => {
  return m > 0 && m <= 12
}

const year = (y) => {
  if (y < 2017) return false
  let tooMuch = new Date().getFullYear() + 10
  return y <= tooMuch
}

export default {
  day,
  month,
  year
}
