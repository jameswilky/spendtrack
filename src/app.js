import { UICtrl } from './ui.js'
import { TransactionCtrl } from './transactions.js'

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
    console.log(newTransaction)

    UICtrl.addToCalendar(newTransaction)

    // Add Transaction to storage

    // Add transaction to UI

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

