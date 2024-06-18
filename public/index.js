
document.addEventListener('DOMContentLoaded', () => {
  //バックエンドエンドへデータ要求
  axios.get('/api/foodlist')
    .then(response => {
      const data = response.data;
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

// const btn = document.getElementById('add-button');
// const foodList = document.getElementById('ingredient-list');

//  btn.addEventListener('click', function() {
//   const ingredientText = document.getElementById('ingredient-input').value;
//   const itemAmount = document.getElementById('amount-input').value;

// // 追加リストメソッド作成
//   if (ingredientText && itemAmount) {
//     const list = document.createElement('li');
//     list.textContent = `${ingredientText}: ${itemAmount}g`; //textcontentでcreatメソッドを持つlistにテキスト値として入力可能
    

//     // 削除ボタン
//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = '削除';
//     deleteBtn.addEventListener('click', function() {
//       list.remove();
//     })

//     list.appendChild(deleteBtn);//foodlistにdeletebtを追加するとlistにdeletebtnを追加することになるので食材テキストを除去しても残る

//     //食材リスト追加と入力テキスト削除
//     foodList.appendChild(list);
//     document.getElementById('ingredient-input').value = '';
//     document.getElementById('amount-input').value = '';

//   } else {
//     alert('食材名と量を入力してください');
//   }
// });
