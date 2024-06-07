const express = require("express");
const app = express();
const mysql = require("mysql2");
const port = 3000;
const config = require("./config/mysql.config.js");

//viewエンジン設定
app.set("view engine", "ejs");
app.use("/", require("./routes/index.js"))

//static rooting
app.use(express.static('public'));

//db取得
app.use("/test", async(req, res, next) =>{
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

  try {
    await client.connect();
    data = await client.query('SELECT * FROM foodlist');
    console.log(data);
  } catch (err) {
    next(err);
  } finally {
    await client.end();
  }
  res.end("ok");
});
  
app.listen(port, () => {
    console.log(`このサーバーは ${port}に接続されています`);
  });