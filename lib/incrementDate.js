Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date.toDateString()
}

const currentDate = new Date()
export default currentDate
