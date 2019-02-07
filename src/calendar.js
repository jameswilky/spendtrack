// Calendar Controller
export const CalendarCtrl = (function () {

  return {
    parseDate: function (date) {
      const arr = date.split(' ')
      return {
        year: arr[2],
        month: arr[1],
        day: arr[0],
      }
    },
    yearHTML: function (year) {
      let output;
      output = `
        <li class="${year}">
          <div class="collapsible-header ">${year}
          </div>
            <div class="collapsible-body">
              <div class="row">
                <div class="col s12 m12">
                  <ul class="collapsible">
                  </ul>
                </div>
              </div>
            </div>
        </li>
      `
      return output
    },
    monthHTML: function (month) {
      let output;
      output = `
        <li class="${month}">
          <div class="collapsible-header white">
            ${month}
          </div>
          <div class="collapsible-body">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </li>
      `
      return output
    },
    transactionHTML: function (transaction, day) {
      // To do pass icon
      let output;
      output = `
        <tr class="${day}">
          <td>${transaction.date}</td>
          <td>${transaction.name}</td>
          <td><i class="material-icons">restaurant</i></td>
          <td>$${transaction.cost}</td >
          <td>
            <a href="#" class="secondary-content">
              <i class="material-icons">create</i>
            </a>
          </td>
        </tr>
      `
      return output

    }
  }
})();