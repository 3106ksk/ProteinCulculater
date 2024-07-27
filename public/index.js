let foodsByCategory = {};
let totalProtein = 0;
const selectedFoods = {};

document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.getElementById('category-select');
  const foodSelect = document.getElementById('ingredient-input');
  const addFoodButton = document.getElementById('add-button');
  const foodListElement = document.getElementById('ingredient-list');

  // カテゴリーのデータを取得
  axios.get('/api/categories')
    .then(response => {
      const categories = response.data;
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching categories:', error));

  // カテゴリーが変更されたときの処理
  categorySelect.addEventListener('change', () => {
    const selectedCategoryId = parseInt(categorySelect.value);
    foodSelect.textContent = "";

    axios.get(`/api/foods?category=${selectedCategoryId}`)
      .then(response => {
        foodsByCategory[selectedCategoryId] = response.data;
        foodsByCategory[selectedCategoryId].forEach(foodItem => {
          const option = document.createElement('option');
          option.value = foodItem.food_name;
          option.textContent = `${foodItem.food_name} (${foodItem.protein}g/100g)`;
          foodSelect.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching food list:', error));
  });

  // 食材をリストに追加する処理
  addFoodButton.addEventListener('click', function () {
    const selectedCategoryId = parseInt(categorySelect.value);
    const selectedFoodName = foodSelect.value;
    const selectedFoodText = foodSelect.options[foodSelect.selectedIndex].text;
    const selectedFoodAmount = parseInt(amountInput.value);

    if (selectedFoodName && selectedFoodAmount) {
      if (!selectedFoods[selectedCategoryId]) {
        selectedFoods[selectedCategoryId] = [];
      }
      selectedFoods[selectedCategoryId].push({ name: selectedFoodName, amount: selectedFoodAmount, categoryId: selectedCategoryId });
      
      const listItem = document.createElement('li');
      listItem.textContent = `${selectedFoodText} 摂取量:${selectedFoodAmount}g`;
      foodListElement.appendChild(listItem);

      // タンパク質の自動計算
      calculateTotalProtein();
    } else {
      alert('食材名と量を入力してください');
    }
  });
});

// タンパク質の総量を計算する関数
function calculateTotalProtein() {
  let totalProtein = 0;
  Object.values(selectedFoods).forEach(foodList => {
    foodList.forEach(food => {
      const foodItem = foodsByCategory[parseInt(food.categoryId)].find(item => item.food_name === food.name);
      if (foodItem) {
        totalProtein += (food.amount / 100) * foodItem.protein;
      }
    });
  });

  const totalProteinDisplayElement = document.getElementById('total-protein');
  totalProteinDisplayElement.textContent = `タンパク質の総量: ${totalProtein.toFixed(2)}g`;
  console.log(`Updated total protein: ${totalProtein.toFixed(2)}g`);
}
