const router = require('express').Router();
const createdbConnection = require("../db/dbConnection.js");


//カテゴリーidレスポンス
router.get("/categories", async(req, res, next) =>{
  const client = createdbConnection();

  try {
    await client.connect();
    const categoryData = await client.query('SELECT * FROM categories');
    res.json(categoryData);
  } catch (err) {
    console.log('Eroor has occured!');
    next(err);
  } finally {
    await client.end();
  }
});

module.exports = router;
