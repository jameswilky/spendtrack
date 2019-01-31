

// UI Controller
export const UI = (function () {
  const UISelectors = {
    datepicker: '.datepicker',
    collapsible: '.collapsible',
    dropdownTrigger: '.dropdown-trigger',
    modal: '.modal'
  }

  return {
    initMaterialize: function () {
      // Init Datepicker
      const datepickerElements = document.querySelectorAll(UISelectors.datepicker)
      M.Datepicker.init(datepickerElements, {});

      // Init Collapser
      const collapsibleElements = document.querySelectorAll(UISelectors.collapsible);
      M.Collapsible.init(collapsibleElements, {});

      //Init Category dropdown menu
      const dropdownTriggerElements = document.querySelectorAll(UISelectors.dropdownTrigger);
      M.Dropdown.init(dropdownTriggerElements, {});

      //Init Add Category modal
      const modalElements = document.querySelectorAll(UISelectors.modal);
      M.Modal.init(modalElements, {});

    }
  }
})();


