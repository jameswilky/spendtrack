import { CategoryCtrl } from "./categories";

// UI Controller
export const UICtrl = (function () {
  const UISelectors = {
    datepicker: '.datepicker',
    collapsible: '.collapsible',
    dropdownTrigger: '.dropdown-trigger',
    modal: '.modal',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    transactionNameInput: '#transaction-name',
    transactionCategoryInput: '#transaction-category',
    transactionCostInput: '#transaction-cost',
    transactionDateInput: '#transaction-date',
    calendar: '#calendar'
  }



  const findTargetContainer = function (date) {
    const calendar = document.querySelector(UISelectors.calendar)
    const years = Array.from(calendar.children)
    let selector;
    years.forEach(year => {
      if (year.classList.contains(date.year)) {
        const container = year.querySelector(UISelectors.collapsible)
        const months = Array.from(container.children)

        months.forEach(month => {
          if (month.classList.contains(date.month)) {
            selector = month.querySelector('tbody')
          }
        })
      }
    })

    return selector
  }
  const createTransactionElement = function (transaction) {
    let icon = CategoryCtrl.getIcon(transaction.category)
    /* Create template string for transaction HTML */
    let output;
    output = `
          <td>${transaction.date.full}</td>
          <td>${transaction.name}</td>
          <td><img src=${icon}></td>
          <td>$${transaction.cost}</td >
          <td>
            <a href="#" class="secondary-content">
              <i class="material-icons edit-transaction">create</i>
            </a>
          </td>
      `
    /* Create Transaction Element*/
    let element = document.createElement('tr')
    /*Append output to new element*/
    element.innerHTML = output
    element.classList.add(transaction.date.day, `transaction-${transaction.id}`)

    return element
  }
  const createYearElement = function (year) {
    /* Create template string for year HTML */
    let output;
    output = `
        <div class="collapsible-header ">${year}
        </div>
          <div class="collapsible-body">
            <div class="row">
                <ul class="collapsible">
                </ul>
            </div>
          </div>
          `

    /* Create Year Element*/
    let element = document.createElement('li')
    /*Append output to new element*/
    element.innerHTML = output
    element.classList.add(`${year}`)

    let container = element.querySelector('.collapsible')

    return {
      element, // Represents the element that has been created holding the 'year' html item
      container // Represents the selector that will be used to hold the nested month html items
    }

  }
  const createMonthElement = function (month) {
    /* Create template string for month HTML */
    let output;
    output = `
        <div class="collapsible-header">
          ${month}
        </div>
        <div class="collapsible-body">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
    `
    /* Create Month Element*/
    let element = document.createElement('li')
    /*Append output to new element*/
    element.innerHTML = output
    element.classList.add(`${month}`)

    let container = element.querySelector('tbody')

    return {
      element, // Represents the element that has been created holding the 'month' html item
      container // Represents the selector that will be used to hold the nested month html items
    }

  }

  return {
    initMaterialize: function (categories) {
      // Init Datepicker
      const datepickerElement = document.querySelector(UISelectors.datepicker)
      M.Datepicker.init(datepickerElement,
        {
          format: 'dd/mm/yyyy',
          defaultDate: new Date(Date.now()),
          setDefaultDate: true
        });

      // set placeholder date to todays date and format as ' dd mm yyyy'
      datepickerElement.value = new Date(Date.now()).toLocaleDateString('en-GB')

      // Init Collapser
      const collapsibleElements = document.querySelectorAll(UISelectors.collapsible);
      M.Collapsible.init(collapsibleElements, {});

      // Init category autocomplete
      var elems = document.querySelectorAll('.autocomplete');
      M.Autocomplete.init(elems, {
        data: categories
      });

      //Init Add Category modal
      const modalElements = document.querySelectorAll(UISelectors.modal);
      M.Modal.init(modalElements, {});
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none'
      document.querySelector(UISelectors.deleteBtn).style.display = 'none'
      document.querySelector(UISelectors.backBtn).style.display = 'none'
      document.querySelector(UISelectors.addBtn).style.display = 'inline'

    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline'
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
      document.querySelector(UISelectors.backBtn).style.display = 'inline'
      document.querySelector(UISelectors.addBtn).style.display = 'none'

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
    appendYearElement: function (date) {
      const monthnames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]

      /* Grab Calendar element*/
      let calendar = document.querySelector(UISelectors.calendar)

      /* Create Year Element*/
      let year = createYearElement(date.year)
      // Append Year element to Calendar
      calendar.insertAdjacentElement('beforeend', year.element)

      /*Fill Year Element with Month Elements*/
      monthnames.forEach(monthname => {
        //Create Month Element
        let month = createMonthElement(monthname)
        //Append html required for displaying month in calendar
        year.container.insertAdjacentElement('beforeend', month.element)
        // Reinitialize collapsible elements and given them materialie related functionality

      });

      // Give new element collapsible functionality via Materialize
      const collapsibleElements = document.querySelectorAll(UISelectors.collapsible);
      M.Collapsible.init(collapsibleElements, {});
    },
    clearInput: function () {
      // Empty input fields
      document.querySelector(UISelectors.transactionNameInput).value = ''
      document.querySelector(UISelectors.transactionCategoryInput).value = ''
      document.querySelector(UISelectors.transactionCostInput).value = ''
      // Change date to todays date
      document.querySelector(UISelectors.transactionDateInput).value = new Date(Date.now()).toLocaleDateString('en-GB')

    },
    yearElementExists: function (year) {
      let found = false
      const calendar = document.querySelector(UISelectors.calendar)
      const yearElements = Array.from(calendar.children)
      yearElements.forEach(element => {
        if (element.classList.contains(year)) {
          found = true
        }
      })
      return found

    },
    addTransactionElement: function (transaction) {
      const element = createTransactionElement(transaction)

      const target = findTargetContainer(transaction.date)
      target.insertAdjacentElement('beforeend', element)
    },
    updateTransactionElement: function (transaction) {
      // Create new element with updated transaction
      const element = createTransactionElement(transaction)
      // Revert ID back to previous id
      element.id = transaction.id

      //Remove old element
      this.deleteTransactionElement(transaction)

      //Locate container for new element
      const target = findTargetContainer(transaction.date)
      // insert new element
      target.insertAdjacentElement('beforeend', element)
    },
    deleteTransactionElement: function (transaction) {
      const element = document.querySelector(`.transaction-${transaction.id}`)
      element.parentNode.removeChild(element);
    },
    addTransactionToForm: function (transaction) {
      document.querySelector(UISelectors.transactionNameInput).value = transaction.name
      document.querySelector(UISelectors.transactionCategoryInput).value = transaction.category
      document.querySelector(UISelectors.transactionCostInput).value = transaction.cost
      document.querySelector(UISelectors.transactionDateInput).value = transaction.date.full
      this.showEditState();
    }

  }
})();

