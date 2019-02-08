import { UICtrl } from './ui.js'
import { TransactionCtrl } from './transactions.js'
import { CalendarCtrl } from './calendar.js';

// App Controller
const App = (function (UICtrl, TransactionCtrl) {

  // Load Event listeners
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    //Add transaction Event
    document.querySelector(UISelectors.addBtn).addEventListener('click',
      transactionAddSubmit);


    // Prevent reload on click
    document.querySelector('.add-btn').addEventListener('click', (e) => {
      e.preventDefault()
      return false
    })

  }

  // Add transaction submit
  const transactionAddSubmit = function (e) {
    const input = UICtrl.getTransactionInput();

    // Add Transaction
    const newTransaction = TransactionCtrl.addTransaction(input)

    /* convert mmm/dd/yyyy format to object with year,month and day properties*/
    const date = CalendarCtrl.parseDate(newTransaction.date) //e.g 01/02/1994 -> date:{day:01, month:"February", year: 1994}

    //Check if new item will require adding a new year to the calendar widget
    if (!CalendarCtrl.yearExists(date.year)) {
      UICtrl.appendYearElement(date)
      CalendarCtrl.addCalendarItem(newTransaction, date)
    }
    // UICtrl.addToCalendar(newTransaction)

    // Add Transaction to storage

    // Add transaction to UI

    e.preventDefault();
  }



  return {
    init: function () {
      // Initialize Materialize components
      UICtrl.initMaterialize()

      loadEventListeners()
      console.log('TransactionCtrl:', TransactionCtrl, 'UICtrl:', UICtrl, 'AppCtrl', App, 'CalendarCtrl', CalendarCtrl)
    },


  }
})(UICtrl, TransactionCtrl)

document.addEventListener('DOMContentLoaded', function () {
  App.init();
});

