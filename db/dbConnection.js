const mysql = require("mysql2");
const config = require("../config/mysql.config.js");
const {promisify} = require("util");

function createdbConnection(){
  const con = mysql.createConnection({
    host: config.HOST,
    port: config.PORT,
    user: config.USERNAME,
    password: config.PASSWORD,
    database: config.DATABASE
  });

  return{
      connect: promisify(con.connect).bind(con),
      query: promisify(con.query).bind(con),
      end: promisify(con.end).bind(con),
  };
};




module.exports = createdbConnection;

