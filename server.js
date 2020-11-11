'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var knex = require('knex')({
    client: 'pg',
    version: '11.4',
    connection: {
      host : 'ec2-3-214-46-194.compute-1.amazonaws.com',
      user : 'qdlwgooewmhflu',
      password : 'ee8fdfbd8a9104e19451baa259bf78bb8be8f767a50d69e0d5c51e77015e6039',
      database : 'd6t60n7r9hfjua'
    }
});
const app = express();
var jsonParser = bodyParser.json();

function insertNewUSer(json){
    console.log("hola")
    return knex('users').insert(json);
}

app.get('/', function (req, res) {
  res.send("This is a server test. Hello");
});

app.post('/user', jsonParser, function (req, res, next) {

    console.log("user method")

    var jsn = JSON.stringify(req.body);
    var jsondata = JSON.parse(jsn);

    console.log(jsondata)

    insertNewUSer(jsondata).then(() => {
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