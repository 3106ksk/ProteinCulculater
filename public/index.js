let data;
let totalProtein;

document.addEventListener('DOMContentLoaded', () => {
//バックエンドへデータ要求
  axios.get('/api/foodlist')
    .then(response => {
      data = response.data;
      const foodSelect = document.getElementById('ingredient-input');
      data.forEach(food => {
        const option = document.createElement('option');
        option.value = food.name;
        option.textContent = `${food.name} (${food.protein_per_100g}g/100g)`;
        foodSelect.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching food list:', error));
});

const addbtn = document.getElementById('add-button');
const foodList = document.getElementById('ingredient-list');
let selectedFoods = [];

 addbtn.addEventListener('click', function() {
  const ingredientInput = document.getElementById('ingredient-input');
  const amountInput = document.getElementById('amount-input');
  const foodId = ingredientInput.value;
  const foodTxt = ingredientInput.options[ingredientInput.selectedIndex].text;
  const amountTxt = parseInt(amountInput.value);

  if (foodId && amountTxt) {
    selectedFoods.push({id: foodId, amount: amountTxt});
    const list = document.createElement('li');
    list.textContent = `${foodTxt} ${amountTxt}g`;
    foodList.appendChild(list);
    console.log(selectedFoods);
    
 // automatic calculate
 totalProtein = 0;
 selectedFoods.forEach(food => {
   const foodData = data.find(item => item.id === parseInt(food.id));
   if (foodData) {
     totalProtein += (food.amount / 100) * foodData.protein_per_100g;
   }
 });
 let totalProteinDisplay = document.getElementById('total-protein');
 totalProteinDisplay.textContent = `タンパク質の総量: ${totalProtein.toFixed(2)}g`;
  } else {
    alert('食材名と量を入力してください');
  }
});