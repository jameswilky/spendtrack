// Transactions Controller
export const TransactionCtrl = (function () {
  // Transaction constructor
  const Transaction = function (id, name, category, cost, date) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.cost = cost;
    this.date = date;
  }

  // Category table
  const categories = [
    { id: 0, name: 'Eating Out', icon: '' },
    { id: 1, name: 'Groceries', icon: '' },
    { id: 2, name: 'Transport', icon: '' },
  ]

  // Data Structure / State
  const data = {
    transactions: [
      // { id: 0, name: 'McDonalds Meal', category: 'Eating Out', cost: 25.00, date: '01/01/2018' },
      // { id: 0, name: 'Groceries', category: 'Groceries', cost: 100.75, date: '04/01/2018' },
      // { id: 0, name: 'Transport', category: 'Transport', cost: 5.20, date: '07/01/2018' }
    ],
    currentTransaction: null
  }

  // Public Methods
  return {
    getTransactions() {
      return data.transactions
    },
    generateID() {
      let ID
      // Create ID
      if (data.transactions.length > 0) {
        ID = data.transactions[data.transactions.length - 1].id + 1;
      } else {
        ID = 0;
      }
      return ID
    },
    getCurrentItem() {
      return data.currentTransaction
    },
    setCurrentTransaction(transaction) {
      data.currentTransaction = transaction
    },
    parseDate: function (date) {
      const monthnames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]

      const arr = date.split('/')
      return {
        full: date,
        year: arr[2],
        month: monthnames[parseInt(arr[1]) - 1],
        day: arr[0]
      }
    },
    addTransaction: function (transaction) {
      const ID = this.generateID()

      // Create New Transaction
      const date = this.parseDate(transaction.date)
      const newTransaction = new Transaction(ID, transaction.name,
        transaction.category, transaction.cost, date, true)


      // Add items to data structure
      data.transactions.push(newTransaction);

      return newTransaction
    },

    updateTransaction: function (updatedTransaction) {
      let found = null;

      data.transactions.forEach(transaction => {
        if (transaction.id === data.currentTransaction.id) {
          transaction.name = updatedTransaction.name
          transaction.date = this.parseDate(updatedTransaction.date)
          transaction.category = updatedTransaction.category
          transaction.cost = updatedTransaction.cost
          found = transaction
        }
      });

      return found
    },
    deleteTransaction: function (id) {
      // get ids
      const ids = data.transactions.map(function (transaction) {
        return transaction.id;
      })

      // Get index
      const index = ids.indexOf(id);

      //Remove item
      data.transactions.splice(index, 1);

    },
    getTransactionById: function (id) {
      let found = null;

      data.transactions.forEach((transaction) => {
        if (transaction.id == id) {
          found = transaction;
        }
      })
      return found
    },
    logData: function () {
      return data;
    }
  }
})();