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

    addToCalendar: function (transaction) {
      const date = CalendarCtrl.parseDate(transaction.date)
      const structure = CalendarCtrl.getCalendarData()

      /* Grab Calendar element*/
      let calendar = document.querySelector(UISelectors.calendar)

      /* Create Year Element*/
      let year = CalendarCtrl.createYearElement(date.year)

      // Append Year element to Calendar
      calendar.insertAdjacentElement('beforeend', year.element)

      /*Fill Year Element with Month Elements*/
      CalendarCtrl.getMonths().forEach(monthName => {
        //Create Month Element
        let month = CalendarCtrl.createMonthElement(monthName)

        //Append html required for displaying month in calendar
        year.container.insertAdjacentElement('beforeend', month.element)


        //Check if transaction fits inside this month
        let abrev = monthName.slice(0, 3) // Eg: February -> Feb
        if (date.month == abrev) {
          let transactionElement = CalendarCtrl.createTransactionElement(transaction, date.day)
          console.log(month.container)
          month.container.insertAdjacentElement('beforeend', transactionElement)
        }
        // TEMP
        // Reinitialize collapsible elements and given them materialie related functionality
        const collapsibleElements = document.querySelectorAll(UISelectors.collapsible);
        M.Collapsible.init(collapsibleElements, {});
      });
    }

  }
})(CalendarCtrl);


