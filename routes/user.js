const router = require('express').Router();


router.get('/', (req,res) => {
  res.end('ユーザーです');
});



module.exports = router;