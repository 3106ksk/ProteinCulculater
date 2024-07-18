let foodData;
let totalProteinAmount;

document.addEventListener('DOMContentLoaded', () => {
  // API Categories
  const categorySelectElement = document.getElementById('category-select');

  axios.get('/api/categories')
    .then(response => {
      const categories = response.data;
      categories.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.value = category.id;
        optionElement.textContent = category.name;
        categorySelectElement.appendChild(optionElement);
      });
    })
    .catch(error => console.error('Error fetching categories:', error));

  categorySelectElement.addEventListener('change', () => {
    const selectedCategoryId = parseInt(categorySelectElement.value);
    const foodSelectElement = document.getElementById('ingredient-input');
    foodSelectElement.textContent = "";

    axios.get(`/api/foods?category=${selectedCategoryId}`)
      .then(response => {
        foodData = response.data;
        console.log(foodData);
        foodData.filter(food => food.category === selectedCategoryId).forEach(foodItem => {
          const optionElement = document.createElement('option');
          optionElement.value = foodItem.food_name;
          optionElement.textContent = `${foodItem.food_name} (${foodItem.protein}g/100g)`;
          foodSelectElement.appendChild(optionElement);
          console.log(foodSelectElement);
        });
      })
      .catch(error => console.error('Error fetching food list:', error));
  });
});

const addButton = document.getElementById('add-button');
const foodListElement = document.getElementById('ingredient-list');
let selectedFoodList = [];

addButton.addEventListener('click', function () {
  const foodSelectElement = document.getElementById('ingredient-input');
  const amountInputElement = document.getElementById('amount-input');
  const selectedFoodName = foodSelectElement.value;
  const selectedFoodText = foodSelectElement.options[foodSelectElement.selectedIndex].text;
  const selectedFoodAmount = parseInt(amountInputElement.value);

  if (selectedFoodName && selectedFoodAmount) {
    selectedFoodList.push({ name: selectedFoodName, amount: selectedFoodAmount });
    const listItemElement = document.createElement('li');
    listItemElement.textContent = `${selectedFoodText} 摂取量:${selectedFoodAmount}g`;
    console.log(selectedFoodList);
    foodListElement.appendChild(listItemElement);

    // Automatic calculate
    calculateTotalProtein(selectedFoodList);
  } else {
    alert('食材名と量を入力してください');
  }
});

// Functions
function calculateTotalProtein(selectedFoodList) {
  let totalProtein = 0;
  selectedFoodList.forEach(food => {
    const foodItem = foodData.find(item => item.food_name === food.name);
    if (foodItem) {
      totalProtein += (food.amount / 100) * foodItem.protein;
    }
  });

  let totalProteinDisplayElement = document.getElementById('total-protein');
  totalProteinDisplayElement.textContent = `タンパク質の総量: ${totalProtein.toFixed(2)}g`;
  console.log(`Updated total protein: ${totalProtein.toFixed(2)}g`);
}
