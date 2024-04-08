const btn = document.getElementById('add-button');
const foodList = document.getElementById('ingredient-list');

 btn.addEventListener('click', function() {

  const ingredientText = document.getElementById('ingredient-input').value;
  const itemAmount = document.getElementById('amount-input').value;

// 追加リストメソッド作成
  if (ingredientText && itemAmount) {
    const list = document.createElement('li');
    list.textContent = `${ingredientText}: ${itemAmount}g`; //textcontentでcreatメソッドを持つlistにテキスト値として入力可能
    foodList.appendChild(list);

  } else {
    alert('食材名と量を入力してください');
  }
});