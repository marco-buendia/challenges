'use strict';
var express = require('express');
var bodyParser = require('body-parser');
const app = express();
var jsonParser = bodyParser.json();

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'qdlwgooewmhflu',
  host: '    ec2-3-214-46-194.compute-1.amazonaws.com',
  database: 'd6t60n7r9hfjua',
  password: 'ee8fdfbd8a9104e19451baa259bf78bb8be8f767a50d69e0d5c51e77015e6039',
  port: 5432,
})

function insertNewUSer(data){
    console.log("hola")
    pool.query('INSERT INTO users ("user_id","name","lastName","phoneNumber","userType") VALUES ($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING', data, (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send("User added")
    })
}

function connect () {
  const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
  };
  config.host = process.env.INSTANCE_CONNECTION_NAME;

  // Connect to the database
  const knex = Knex({
    client: 'pg',
    connection: config
  });
  //console.log(config);
  return knex;
}


app.get('/', function (req, res) {
  res.send("This is a server test. Hello");
});

app.post('/user', jsonParser, function (req, res, next) {

    console.log("user method")

    var jsn = JSON.stringify(req.body);
    var jsondata = JSON.parse(jsn);

    const data = []

    data.push("");
    data.push(jsondata["name"]);
    data.push(jsondata["lastName"]);
    data.push(jsondata["phoneNumber"]);
    data.push(jsondata["userType"]);

    insertNewUSer(data).then(() => {
        res
          .status(200)
          .set('Content-Type', 'text/plain')
          .send(`Successfully registered entry\n`)
          .end();
          return knex.destroy();
      })
      .catch((err) => {
        next(err);
        if (knex) {
          knex.destroy();
        }
      });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App restarted`);
});