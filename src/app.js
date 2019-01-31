import { UI } from './ui.js'
import { Transactions } from './transactions.js'

// App Controller
const App = (function (UI, Transactions) {

  // Load Event listeners
  const loadEventListeners = function () {
    // Get UI Selectors
    // const UISelectors = UI.getSelectors();

  }

  return {
    init: function () {
      // Initialize Materialize components
      UI.initMaterialize()

      loadEventListeners()
    }
  }
})(UI, Transactions)

document.addEventListener('DOMContentLoaded', function () {
  App.init();
});