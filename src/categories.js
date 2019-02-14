// Categories Controller
export const CategoryCtrl = (function () {
  const root = './src/assets/icons/'
  const data = {
    categories: {
      "Groceries": root + 'cart.png',
      "Eating Out": root + 'dining.png',
      "Commute": root + 'commute.png',
      "Gym": root + 'gym.png',
      "Alcohol": root + 'alcohol.png',
      'Holidays': root + 'plane.png',
      'Medical': root + 'medical.png',
      'Coffee': root + 'coffee.png',
      'Petrol': root + 'petrol.png',
      'Other': root + 'money.png'
    }
  }

  return {
    getCategories: function () {
      return data.categories
    },
    getIcon: function (category) {
      let icon = null
      //parse category to lowercase with capital first letter
      category.toLowerCase().charAt(0).toUpperCase()

      Object.entries(data.categories).forEach(entry => {
        const key = entry[0]
        const value = entry[1]

        if (key == category) {
          icon = value
        }
      })
      if (icon == null) {
        icon = root + 'money.png'
      }
      return icon
    }
  }
})();
