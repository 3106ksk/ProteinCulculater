let foodDataByCategory = {};
let totalProteinAmount = 0;
const selectedFoodsByCategory = {};

document.addEventListener('DOMContentLoaded', () => {
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
        foodDataByCategory[selectedCategoryId] = response.data;
        console.log(foodDataByCategory[selectedCategoryId]);
        foodDataByCategory[selectedCategoryId].forEach(foodItem => {
          const optionElement = document.createElement('option');
          optionElement.value = foodItem.food_name;
          optionElement.textContent = `${foodItem.food_name} (${foodItem.protein}g/100g)`;
          foodSelectElement.appendChild(optionElement);
        });
      })
      .catch(error => console.error('Error fetching food list:', error));
  });
});

const addButton = document.getElementById('add-button');
const foodListElement = document.getElementById('ingredient-list');

addButton.addEventListener('click', function () {
  const foodSelectElement = document.getElementById('ingredient-input');
  const amountInputElement = document.getElementById('amount-input');
  const selectedCategoryId = document.getElementById('category-select').value;
  const selectedFoodName = foodSelectElement.value;
  const selectedFoodText = foodSelectElement.options[foodSelectElement.selectedIndex].text;
  const selectedFoodAmount = parseInt(amountInputElement.value);

  if (selectedFoodName && selectedFoodAmount) {
    if (!selectedFoodsByCategory[selectedCategoryId]) {
      selectedFoodsByCategory[selectedCategoryId] = [];
    }
    selectedFoodsByCategory[selectedCategoryId].push({ name: selectedFoodName, amount: selectedFoodAmount, categoryId: selectedCategoryId });
    const listItemElement = document.createElement('li');
    listItemElement.textContent = `${selectedFoodText} 摂取量:${selectedFoodAmount}g`;
    foodListElement.appendChild(listItemElement);

    calculateTotalProtein();
  } else {
    alert('食材名と量を入力してください');
  }
});

//関数
function calculateTotalProtein() {
  let totalProtein = 0;
  Object.values(selectedFoodsByCategory).forEach(foodList => {
    foodList.forEach(food => {
      const foodItem = foodDataByCategory[parseInt(food.categoryId)].find(item => item.food_name === food.name);
      if (foodItem) {
        totalProtein += (food.amount / 100) * foodItem.protein;
      }
    });
  });

  let totalProteinDisplayElement = document.getElementById('total-protein');
  totalProteinDisplayElement.textContent = `タンパク質の総量: ${totalProtein.toFixed(2)}g`;
  console.log(`Updated total protein: ${totalProtein.toFixed(2)}g`);
}
