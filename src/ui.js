// UI Controller
export const UICtrl = (function () {
  const UISelectors = {
    datepicker: '.datepicker',
    collapsible: '.collapsible',
    dropdownTrigger: '.dropdown-trigger',
    modal: '.modal',
    addBtn: '.add-btn',
    transactionNameInput: '#transaction-name',
    // transactionCategoryInput: '#transaction-category',
    transactionCostInput: '#transaction-cost',
    transactionDateInput: '#transaction-date',
  }

  return {
    initMaterialize: function () {
      // Init Datepicker
      const datepickerElement = document.querySelector(UISelectors.datepicker)
      M.Datepicker.init(datepickerElement,
        {
          format: 'dd/mm/yy',
          // defaultDate: new Date(),
          // setDefaultDate: true
        });

      // Get first Date picker instance and set date to todays date by default
      console.log(datepickerElement.placeholder = new Date(Date.now()).toLocaleDateString())

      // Init Collapser
      const collapsibleElements = document.querySelectorAll(UISelectors.collapsible);
      M.Collapsible.init(collapsibleElements, {});

      //Init Category dropdown menu
      const dropdownTriggerElements = document.querySelectorAll(UISelectors.dropdownTrigger);
      M.Dropdown.init(dropdownTriggerElements, {});

      //Init Add Category modal
      const modalElements = document.querySelectorAll(UISelectors.modal);
      M.Modal.init(modalElements, {});
    },
    // Get information from form
    getTransactionInput: function () {
      return {
        name: document.querySelector(UISelectors.transactionNameInput).value,
        // category: document.querySelector(UISelectors.transactionNameInput),
        cost: document.querySelector(UISelectors.transactionCostInput).value,
        date: document.querySelector(UISelectors.transactionDateInput).value,
      }
    },

    getSelectors: function () {
      return UISelectors
    }

  }
})();


