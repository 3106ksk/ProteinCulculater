const express = require("express");
const router = express.Router();
const createConnection = require("../db/dbConnection");

router.get("/foods", async (req, res, next) => {
  const client = createConnection();
  const categoryId = req.query.category;

  try {
    await client.connect();
    const foodData = await client.query('SELECT * FROM foodlist WHERE category = ?', [categoryId]);
    res.json(foodData);
  } catch (err) {
    console.log('Error has occurred!', err);
    next(err);
  } finally {
    await client.end();
  }
});

module.exports = router;
