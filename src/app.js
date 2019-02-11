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
    //Check if new item will require adding a new year to the calendar widget
    if (!TransactionCtrl.yearExists(newTransaction.date.year)) {
      UICtrl.appendYearElement(newTransaction.date)
    }


    // Check calendar to find where to place item

    // Once found, update UI to
    UICtrl.addTransactionElement(newTransaction)

    // Add Transaction to storage

    // Add transaction to UI

    // deselect transaction
    newTransaction.current = false;
    e.preventDefault();
  }



  return {
    init: function () {
      // Initialize Materialize components
      UICtrl.initMaterialize()

      loadEventListeners()
      console.log('TransactionCtrl:', TransactionCtrl, 'UICtrl:', UICtrl, 'AppCtrl', App)
    },


  }
})(UICtrl, TransactionCtrl)

document.addEventListener('DOMContentLoaded', function () {
  App.init();
});

