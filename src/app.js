import { UICtrl } from './ui.js'
import { TransactionCtrl } from './transactions.js'
import { CategoryCtrl } from './categories.js';

// App Controller
const App = (function (UICtrl, TransactionCtrl, CategoryCtrl) {

  // Load Event listeners
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    //Add transaction Event
    document.querySelector(UISelectors.addBtn).addEventListener('click',
      transactionAddSubmit);

    // transaction edit click event on calendar click
    document.querySelector(UISelectors.calendar).addEventListener('click',
      transactionEditClick);

    // transaction update on update button click
    document.querySelector(UISelectors.updateBtn).addEventListener('click',
      transactionUpdateSubmit)

    // transaction delete on button click
    document.querySelector(UISelectors.deleteBtn).addEventListener('click',
      transactionDeleteSubmit)

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

    // Check if year elemnt exists for that year
    if (!UICtrl.yearElementExists(newTransaction.date.year)) {
      UICtrl.appendYearElement(newTransaction.date)
    }
    // Once found, update UI to display new transaction
    UICtrl.addTransactionElement(newTransaction)

    // Add Transaction to storage

    //clear Item
    UICtrl.clearInput();

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
      TransactionCtrl.setCurrentTransaction(transactionToEdit)


      // Load input fields with selected transaction data
      UICtrl.addTransactionToForm(transactionToEdit)

    }

    // e.preventDefault() // Stops from snapping back to top of page, however this might be useful
  }

  // Transaction Update Submit
  const transactionUpdateSubmit = function (e) {
    // Get transaction Input 
    const input = UICtrl.getTransactionInput();

    // update transaction
    const updatedTransaction = TransactionCtrl.updateTransaction(input)
    //Check if new item will require adding a new year to the calendar widget
    if (!UICtrl.yearElementExists(updatedTransaction.date.year)) {
      UICtrl.appendYearElement(updatedTransaction.date)
    }
    //Update UI
    UICtrl.updateTransactionElement(updatedTransaction)

    UICtrl.clearEditState();
    e.preventDefault();
  }

  // Delete item event
  const transactionDeleteSubmit = function (e) {
    // Get Current Transaction
    const currentTransaction = TransactionCtrl.getCurrentItem();

    // Delete item from data structure
    TransactionCtrl.deleteTransaction(currentTransaction.id)

    // Delete from UI
    UICtrl.deleteTransactionElement(currentTransaction)

    // clear UI
    UICtrl.clearEditState();
    e.preventDefault();
  }

  return {
    init: function () {
      //Set Initial state of edit buttons
      UICtrl.clearEditState();

      // Get Categories
      const categories = CategoryCtrl.getCategories()
      // Initialize Materialize components
      UICtrl.initMaterialize(categories)

      loadEventListeners()
      console.log('TransactionCtrl:', TransactionCtrl, 'UICtrl:', UICtrl, 'AppCtrl', App)
    },


  }
})(UICtrl, TransactionCtrl, CategoryCtrl)

document.addEventListener('DOMContentLoaded', function () {
  App.init();
});

