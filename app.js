const express = require("express");
const app = express();
const mysql = require("mysql2");
const port = 3000;

const con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "3106kmkaio",
  database: "food_protein"
});

con.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
  });

  app.get('/', (req, res) => {
    con.query(
      'SELECT * FROM foodlist',
      (error, results) => {
        console.log(results);
        res.send('エラーが発生しています');
      }
    );
  });
  
app.listen(port, () => {
    console.log(`このサーバーは ${port}に接続されています`);
  });

