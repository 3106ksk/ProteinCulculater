const express = require('express');
const app = express();
const userRouter = require('./routes/user');
const PORT = 3000;

app.use(express.static('public'));

// app.get('/user/info', (req,res) => {
//   //  console.log('hello');
//   //  res.send('こんにちは');
//   // res.send('ユーザー情報です');
// });

//ルーティング設計
app.use('/user', userRouter);
app.listen(PORT, () => console.log('サーバーを起動します'));

//ミドルウェア


