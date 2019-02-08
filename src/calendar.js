// Calendar Controller
export const CalendarCtrl = (function () {

  let structure = [
    { selector: null, date: null, transaction: {} }
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

    createYearElement(year) {
      /* Create template string for year HTML */
      let output;
      output = `
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
            `

      /* Create Year Element*/
      let element = document.createElement('li')
      /*Append output to new element*/
      element.innerHTML = output
      element.classList.add(year)

      let container = element.querySelector('.collapsible')

      return {
        element, // Represents the element that has been created holding the 'year' html item
        container // Represents the selector that will be used to hold the nested month html items
      }

    },
    // yearHTML: function (year) {
    //   let output;
    //   output = `
    //       <div class="collapsible-header ">${year}
    //       </div>
    //         <div class="collapsible-body">
    //           <div class="row">
    //             <div class="col s12 m12">
    //               <ul class="collapsible">
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //   `
    //   return {
    //     output,
    //     selector: '.collapsible'
    //   }
    // },
    monthHTML: function (month) {
      let output;
      output = `
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
      `
      return {
        output,
        selector: 'tbody'
      }
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