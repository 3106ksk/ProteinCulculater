const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
  //  console.log('hello');
  //  res.send('こんにちは');
  res.send('ユーザーです');
});

router.get('/info', (req,res) => {
  //  console.log('hello');
  //  res.send('こんにちは');
  res.send('ユーザー情報です');
});



module.exports = router;