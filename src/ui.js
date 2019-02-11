// UI Controller
export const UICtrl = (function () {
  const UISelectors = {
    datepicker: '.datepicker',
    collapsible: '.collapsible',
    dropdownTrigger: '.dropdown-trigger',
    modal: '.modal',
    addBtn: '.add-btn',
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
      console.log(year, date.year)
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
    /* Create template string for transaction HTML */
    let output;
    output = `
          <td>${transaction.date.full}</td>
          <td>${transaction.name}</td>
          <td><i class="material-icons">restaurant</i></td>
          <td>$${transaction.cost}</td >
          <td>
            <a href="#" class="secondary-content">
              <i class="material-icons">create</i>
            </a>
          </td>
      `
    /* Create Transaction Element*/
    let element = document.createElement('tr')
    /*Append output to new element*/
    element.innerHTML = output
    element.classList.add(`${transaction.date.day}`)

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
              <div class="col s12 m12">
                <ul class="collapsible">
                </ul>
              </div>
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
    initMaterialize: function () {
      // Init Datepicker
      const datepickerElement = document.querySelector(UISelectors.datepicker)
      M.Datepicker.init(datepickerElement,
        {
          format: 'dd/mm/yyyy',
          // defaultDate: new Date(),
          // setDefaultDate: true
        });

      // set placeholder date to todays date and format as ' dd mm yyyy'
      datepickerElement.value = new Date(Date.now()).toLocaleDateString('en-GB')

      // Init Collapser
      const collapsibleElements = document.querySelectorAll(UISelectors.collapsible);
      M.Collapsible.init(collapsibleElements, {});

      // //Init Category dropdown menu
      // const dropdownTriggerElements = document.querySelectorAll(UISelectors.dropdownTrigger);
      // M.Dropdown.init(dropdownTriggerElements, {});

      // Init category autocomplete
      var elems = document.querySelectorAll('.autocomplete');
      M.Autocomplete.init(elems, {
        data: {
          "Groceries": null,
          "Eating Out": null,
          "Travel": null,
          "Rent": null
        }
      });
      //Init Add Category modal
      const modalElements = document.querySelectorAll(UISelectors.modal);
      M.Modal.init(modalElements, {});
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

    addTransactionElement: function (transaction) {
      const element = createTransactionElement(transaction)

      const target = findTargetContainer(transaction.date)
      target.insertAdjacentElement('beforeend', element)
    }

  }
})();


