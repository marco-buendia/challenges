'use strict';
var express = require('express');
var bodyParser = require('body-parser');
const app = express();
var jsonParser = bodyParser.json();

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'qdlwgooewmhflu',
  host: 'ec2-3-214-46-194.compute-1.amazonaws.com',
  database: 'd6t60n7r9hfjua',
  password: 'ee8fdfbd8a9104e19451baa259bf78bb8be8f767a50d69e0d5c51e77015e6039',
  port: 5432,
})

function insertNewUSer(data){
    console.log("hola")
    pool.query('INSERT INTO users ("name","lastName","phoneNumber","userType") VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING', data, (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send("User added")
    })
}

app.get('/', function (req, res) {
  res.send("This is a server test. Hello");
});

app.post('/user', jsonParser, function (req, res, next) {

    console.log("user method")

    var jsn = JSON.stringify(req.body);
    var jsondata = JSON.parse(jsn);

    const data = []

    
    data.push(jsondata["name"]);
    data.push(jsondata["lastName"]);
    data.push(jsondata["phoneNumber"]);
    data.push(jsondata["userType"]);

    insertNewUSer(data)
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App restarted`);
});