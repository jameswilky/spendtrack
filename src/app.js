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

  }

  // Add transaction submit
  const transactionAddSubmit = function (e) {
    const input = UICtrl.getTransactionInput();
    console.log(input)

    // Add Transaction
    const newTransaction = TransactionCtrl.addTransaction(input)
    e.preventDefault();
  }



  return {
    init: function () {
      // Initialize Materialize components
      UICtrl.initMaterialize()

      loadEventListeners()
      console.log(TransactionCtrl, UICtrl)
    },


  }
})(UICtrl, TransactionCtrl)

document.addEventListener('DOMContentLoaded', function () {
});
App.init();
let x = 5
