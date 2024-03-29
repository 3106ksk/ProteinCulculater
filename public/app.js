// const buttonAdd = document.getElementById('button-add');
// const buttonClear = document.getElementById('button-clear');
// const list = document.getElementById('item0');

// buttonAdd.addEventListener('click', function() {
//   const element = document.createElement('tr');
//   element.innerHTML = 'データ追加';
//   list.appendChild(element);
// });

// buttonClear.addEventListener('click', function(){
//   list.removeChild(list.lastChild);
// });

document.getElementById('button-add').addEventListener('click', function() {
  const table = document.getElementById('calculationTable');
  
  // 複製行の指定と取得
  const rowToClone = document.getElementById('item0');

  // 行複製,指定したidタグの全部を取得する
  const clonedRow = rowToClone.cloneNode(true);

  // 新しい行をテーブルの最後に挿入
  const dataAdd = document.getElementById('resultProtein');

  dataAdd.before(clonedRow);
});

















 // 新しい行のIDを更新（例: item0, item1, item2,...）
  // 現在の行数から新しいID番号を生成
  const newRowId = 'item' + table.rows.length - 2; // ヘッダ行を除外して計算
  clonedRow.id = newRowId;

  // 複製された行内の入力要素（input）のIDも更新
  clonedRow.querySelectorAll('input').forEach(function(input, index) {
    // 入力要素に新しいIDを割り当て
    if (input.id.includes('Amount')) {
      input.id = `ingredient${table.rows.length - 2}Amount`;
    } else if (input.id.includes('Protein')) {
      input.id = `ingredient${table.rows.length - 2}Protein`;
    }

    // 入力内容をクリア
    input.value = '';
  });
