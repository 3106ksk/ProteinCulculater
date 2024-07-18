const express = require("express");
const app = express();
const port = 3000;
const path = require('path');
const mysql = require("mysql2");
const config = require("./config/mysql.config.js");

//view setup
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use("/", require("./routes/index.js"))

//static rooting
app.use(express.static(path.join(__dirname, 'public')));

//DB connection setup
app.get("/api/categories", async(req, res, next) =>{

  const {promisify} = require("util");
  const con = mysql.createConnection({
    host: config.HOST,
    port: config.PORT,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE
  });

  const client = {
    connect: promisify(con.connect).bind(con),
    query: promisify(con.query).bind(con),
    end: promisify(con.end).bind(con),
  };
  var data;

  //category setup
  try {
    await client.connect();
    categoryData = await client.query('SELECT * FROM categories');
    console.log(categoryData);
    res.json(categoryData);
  } catch (err) {
    console.log('Eroor has occured!');
    next(err);
  } finally {
    await client.end();
  }
});

//food setup
app.get("/api/foods", async(req, res, next) =>{

  const {promisify} = require("util");

  const con = mysql.createConnection({
    host: config.HOST,
    port: config.PORT,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE
  });
  
    const client = {
      connect: promisify(con.connect).bind(con),
      query: promisify(con.query).bind(con),
      end: promisify(con.end).bind(con),
    };

    var foodData;
    const categoryId = req.query.category;

  
    try {
      await client.connect();
      foodData = await client.query('SELECT * FROM foodlist WHERE category = ?', [categoryId]);
      res.json(foodData);
    } catch (err) {
      console.log('Eroor has occured!',err);
      next(err);
    } finally {
      await client.end();
    }
  });



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });