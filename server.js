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

function insertNewCard(data){
  pool.query('INSERT INTO cards ("userId","cardNumber","expDate") VALUES ($1,$2,$3) ON CONFLICT DO NOTHING', data, (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send("Card added")
  })
}

function createBenefactor(data){
  console.log("creating a benefactor")
  pool.query('INSERT INTO benefactors ("userId","beneficiariesPhoneNumber") VALUES ($1,$2) ON CONFLICT DO NOTHING', data, (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send("Benefactor added")
  })
}

function insertNewUSer(data){
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

    if (jsondata["userType"] == "1"){
      if(jsondata["phoneNumber"].startsWith("1")){

        const data = []
    
        data.push(jsondata["name"]);
        data.push(jsondata["lastName"]);
        data.push(jsondata["phoneNumber"]);
        data.push(jsondata["userType"]);

        insertNewUSer(data)

      }
      else{
        res.send("Incorrect user type or phone number")
      }
    }
    else if (jsondata["userType"] == "2"){
      if(jsondata["phoneNumber"].startsWith("52")){

        const data = []
    
        data.push(jsondata["name"]);
        data.push(jsondata["lastName"]);
        data.push(jsondata["phoneNumber"]);
        data.push(jsondata["userType"]);

        insertNewUSer(data)

      }
      else{
        res.send("Incorrect user type or phone number")
      }
    }

    else{
      res.send("User type does not exists")
    }

});

app.get('/user', function (req,res){

  var finalJson = {}

  pool.query('SELECT * FROM users ORDER BY "userId"').then(resp => {
    
    finalJson = resp.rows;
    res.send(finalJson)
  })
  .catch(err => console.error('Error executing query', err.stack))

});

app.post('/cards', jsonParser, function (req, res, next) {

  console.log("card method");

  var jsn = JSON.stringify(req.body);
  var jsondata = JSON.parse(jsn);

  var data = [];
  data.push(jsondata["userId"]);
  data.push(jsondata["cardNumber"]);
  data.push(jsondata["expDate"]);

  insertNewCard(data);

});

app.post('/beneficiaries', jsonParser, function (req, res, next) {

  console.log("beneficiaries method");

  var jsn = JSON.stringify(req.body);
  var jsondata = JSON.parse(jsn);

  var data = [];
  var arr = [];
  data.push(jsondata["userId"]);
  arr.push(jsondata["beneficiaryPhoneNumber"]);
  data.push(arr)

  var beneficiaries = 0
  pool.query('SELECT * FROM benefactors where "userId" = ' + jsondata["userId"]).then(resp => {
    
    var finalJson = resp.rows;
    console.log(finalJson)

    if(Object.keys(finalJson === 0)){
      createBenefactor(data)
    }
    else{
      numberOfBeneficiaries = finalJson.benefactorsPhoneNumber
      console.log(numberOfBeneficiaries)
    }

  })
  .catch(err => console.error('Error executing query', err.stack))

  //insertNewBenefactor(data);

});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App restarted`);
});