const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const cors = require('cors')
const bodyparser = require("body-parser")


dotenv.config();

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "passKeeper";

const app = express();
const port = 3000;
app.use(bodyparser.json())

app.use(cors())

// Use connect method to connect to the server
client.connect();
console.log("Connected successfully to server");



//get all the passwords
app.get ("/", async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");  //change the name of database here
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

//save a password
app.post ("/", async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("passwords"); //change the name of database here
  const findResult = await collection.insertOne(password); //inserting the values
  res.send({success:true , result: findResult}); 
  
});

//Delete a password by ID
app.delete("/", async(req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection("passwords"); //change the name of database here
  const findResult = await collection.deleteOne(password); //inserting the values
  res.send({success:true , result: findResult}); 
  
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
