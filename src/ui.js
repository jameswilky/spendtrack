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
          format: 'dd mmm yyyy',
          // defaultDate: new Date(),
          // setDefaultDate: true
        });

      // set placeholder date to todays date and format as ' dd mmm yyyy'
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

      //Create container for year
      let container = year.container

      /*Fill Year Element with Month Elements*/
      CalendarCtrl.getMonths().forEach(month => {
        //Create Month Element
        let monthElement = document.createElement('li')
        monthElement.innerHTML = CalendarCtrl.monthHTML(month).output
        monthElement.classList.add(month)

        //Append html required for displaying month in calendar
        container.insertAdjacentElement('beforeend', monthElement)
      });


    }

  }
})(CalendarCtrl);


