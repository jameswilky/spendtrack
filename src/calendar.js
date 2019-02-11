// Calendar Controller
export const CalendarCtrl = (function () {
  /* This is used for maintaining the logical state of the calendar */

  let structure = [
    // {
    //   year: 2018,
    //   data: [
    //     {
    //       month: 'January',
    //       data: [
    //         { transaction }
    //       ]
    //     }
    //   ]
    // }
  ]
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

  return {
    yearExists: function (year) {
      // Check structure if year is already present in data structure
      structure.forEach(item => {
        if (year == item.transaction.date.year) {
          return true
        }
      });
    },
    // add: function (transaction) {
    //   const item = {
    //     year: transaction.date.year,
    //     date: [
    //       {
    //         month:
    //       }
    //     ]
    //   }
    //   structure.push
    // }
  }
})();