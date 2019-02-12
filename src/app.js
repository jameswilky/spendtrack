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

    // Add transaction edit click event on calendar click
    document.querySelector(UISelectors.calendar).addEventListener('click',
      transactionEditClick);


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

    // Once found, update UI to display new transaction
    UICtrl.addTransactionElement(newTransaction)

    // Add Transaction to storage

    //clear Item
    UICtrl.clearInput();

    // deselect transaction
    TransactionCtrl.deselect(newTransaction)

    e.preventDefault();
  }

  // Click edit transaction
  const transactionEditClick = function (e) {
    if (e.target.classList.contains('edit-transaction')) {
      // Targets parent transaction element, gets the class name (e.g 'transaction-1') and splits to get the actual ID
      const id = parseInt(e.target.parentNode.parentNode.parentNode.classList[1].split('-')[1])

      // Get transaction
      const transactionToEdit = TransactionCtrl.getTransactionById(id)

      // Set current transaction
      TransactionCtrl.select(transactionToEdit)

      // Load input fields with selected transaction data
      UICtrl.addTransactionToForm(transactionToEdit)

    }

    // e.preventDefault() // Stops from snapping back to top of page, however this might be useful
  }






  return {
    init: function () {
      //Set Initial state of edit buttons
      UICtrl.clearEditState();

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

