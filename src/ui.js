import { CalendarCtrl } from './calendar.js'

// UI Controller
export const UICtrl = (function (CalendarCtrl) {
  const UISelectors = {
    datepicker: '.datepicker',
    collapsible: '.collapsible',
    dropdownTrigger: '.dropdown-trigger',
    modal: '.modal',
    addBtn: '.add-btn',
    transactionNameInput: '#transaction-name',
    transactionCategoryInput: '#transaction-category',
    transactionCostInput: '#transaction-cost',
    transactionDateInput: '#transaction-date',
    calendar: '#calendar'
  }
  return {
    initMaterialize: function () {
      // Init Datepicker
      const datepickerElement = document.querySelector(UISelectors.datepicker)
      M.Datepicker.init(datepickerElement,
        {
          format: 'mmm dd yyyy',
          // defaultDate: new Date(),
          // setDefaultDate: true
        });

      // set placeholder date to todays date and format as ' mm dd yyyy'
      datepickerElement.value = new Date(Date.now()).toString().split(' ').slice(1, 4).join(' ')

      // Init Collapser
      const collapsibleElements = document.querySelectorAll(UISelectors.collapsible);
      M.Collapsible.init(collapsibleElements, {});

      // //Init Category dropdown menu
      // const dropdownTriggerElements = document.querySelectorAll(UISelectors.dropdownTrigger);
      // M.Dropdown.init(dropdownTriggerElements, {});

      // Init category autocomplete
      var elems = document.querySelectorAll('.autocomplete');
      M.Autocomplete.init(elems, {
        data: {
          "Groceries": null,
          "Eating Out": null,
          "Travel": null,
          "Rent": null
        }
      });


      //Init Add Category modal
      const modalElements = document.querySelectorAll(UISelectors.modal);
      M.Modal.init(modalElements, {});
    },
    // Get information from form
    getTransactionInput: function () {
      return {
        name: document.querySelector(UISelectors.transactionNameInput).value,
        category: document.querySelector(UISelectors.transactionCategoryInput).value,
        cost: document.querySelector(UISelectors.transactionCostInput).value,
        date: document.querySelector(UISelectors.transactionDateInput).value,
      }
    },

    getSelectors: function () {
      return UISelectors
    },
    createYearElement: function (year) {
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
      element.classList.add(`calendarItem__${year}`)

      let container = element.querySelector('.collapsible')

      return {
        element, // Represents the element that has been created holding the 'year' html item
        container // Represents the selector that will be used to hold the nested month html items
      }

    },
    createMonthElement: function (month) {
      /* Create template string for month HTML */
      let output;
      output = `
          <div class="collapsible-header">
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
      /* Create Month Element*/
      let element = document.createElement('li')
      /*Append output to new element*/
      element.innerHTML = output
      element.classList.add(`calendarItem__${month}`)

      let container = element.querySelector('tbody')

      return {
        element, // Represents the element that has been created holding the 'month' html item
        container // Represents the selector that will be used to hold the nested month html items
      }

    },
    createTransactionElement: function (transaction, day) {
      /* Create template string for transaction HTML */
      let output;
      output = `
          <td>${transaction.date}</td>
          <td>${transaction.name}</td>
          <td><i class="material-icons">restaurant</i></td>
          <td>$${transaction.cost}</td >
          <td>
            <a href="#" class="secondary-content">
              <i class="material-icons">create</i>
            </a>
          </td>
      `
      /* Create Transaction Element*/
      let element = document.createElement('tr')
      /*Append output to new element*/
      element.innerHTML = output
      element.classList.add(`calendarItem__${day}`)

      return element


    },
    appendYearElement: function (date) {
      /* Grab Calendar element*/
      let calendar = document.querySelector(UISelectors.calendar)

      /* Create Year Element*/
      let year = this.createYearElement(date.year)
      // Append Year element to Calendar
      calendar.insertAdjacentElement('beforeend', year.element)

      /*Fill Year Element with Month Elements*/
      CalendarCtrl.getMonths().forEach(monthName => {
        //Create Month Element
        let month = this.createMonthElement(monthName)

        //Append html required for displaying month in calendar
        year.container.insertAdjacentElement('beforeend', month.element)
        // Reinitialize collapsible elements and given them materialie related functionality

      });
      const collapsibleElements = document.querySelectorAll(UISelectors.collapsible);
      M.Collapsible.init(collapsibleElements, {});
    },
    // addToCalendar: function (transaction) {
    //   const date = CalendarCtrl.parseDate(transaction.date)

    //   /* Grab Calendar element*/
    //   let calendar = document.querySelector(UISelectors.calendar)

    //   /* Create Year Element*/
    //   let year = this.createYearElement(date.year)
    //   // Append Year element to Calendar
    //   calendar.insertAdjacentElement('beforeend', year.element)

    //   /*Fill Year Element with Month Elements*/
    //   CalendarCtrl.getMonths().forEach(monthName => {
    //     //Create Month Element
    //     let month = this.createMonthElement(monthName)

    //     //Append html required for displaying month in calendar
    //     year.container.insertAdjacentElement('beforeend', month.element)

    //     //Check if transaction fits inside this month
    //     let abrev = monthName.slice(0, 3) // Eg: February -> Feb
    //     if (date.month == abrev) {
    //       let transactionElement = this.createTransactionElement(transaction, date.day)
    //       console.log(month.container)
    //       month.container.insertAdjacentElement('beforeend', transactionElement)
    //     }
    //     // TEMP
    //     // Reinitialize collapsible elements and given them materialie related functionality
    //     const collapsibleElements = document.querySelectorAll(UISelectors.collapsible);
    //     M.Collapsible.init(collapsibleElements, {});
    //   });
    // }

  }
})(CalendarCtrl);


