// Calendar Controller
export const CalendarCtrl = (function () {

  let structure = [
    { selector: null, date: {}, transaction: {} }
  ]

  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

  return {
    getCalendarData: function () {
      return structure
    },
    getMonths: function () {
      return months
    },
    parseDate: function (date) {
      const arr = date.split(' ')
      return {
        year: arr[2],
        month: arr[0],
        day: arr[1]
      }
    },
    addCalendarItem: function (transaction, date) {
      let structure = this.getCalendarData();

      const item = {
        selector: document.querySelector(`.calendarItem__${date.year}`)
          .querySelector(`.calendarItem__${date.month}`)
          .querySelector(`.calendarItem__${date.day}`),
        date: date,
        transaction: transaction
      }
      structure.push(item)
    },
    yearExists: function (year) {
      // Check structure if year is already present in data structure
      const structure = this.getCalendarData()
      structure.forEach(item => {
        if (year == item.date.year) {
          return true
        }
      });
    }
  }
})();