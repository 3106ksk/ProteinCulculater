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

//簡易リストでテスト
app.get('/api/foodlist', (req, res) => {
  const foodList = [
    { id: 1, name: '鶏胸肉', protein_per_100g: 31.0 },
    { id: 2, name: '豆腐', protein_per_100g: 8.0 },
    { id: 3, name: '牛乳', protein_per_100g: 3.3 },
    { id: 4, name: '卵', protein_per_100g: 13.0 },
    { id: 5, name: 'サーモン', protein_per_100g: 20.0 }
  ];
  res.json(foodList);
});


// //DB connection setup
// app.get("/api/foodlist", async(req, res, next) =>{
//   const {promisify} = require("util");
//   const con = mysql.createConnection({
//     host: config.HOST,
//     port: config.PORT,
//     user: config.USERNAME,
//     password: config.PASSWORD,
//     database: config.DATABASE
//   });

//   const client = {
//     connect: promisify(con.connect).bind(con),
//     query: promisify(con.query).bind(con),
//     end: promisify(con.end).bind(con),
//   };
//   var data;

//   try {
//     await client.connect();
//     data = await client.query('SELECT * FROM foodlist');
//     console.log(data);
//   } catch (err) {
//     next(err);
//   } finally {
//     await client.end();
//   }
//   res.end("ok");
// });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });