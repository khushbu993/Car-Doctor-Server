const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qagzg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

client.connect(err => {
    const customerCollection = client.db(`${process.env.DB_NAME}`).collection("customers");
        console.log('database connected successfully');
  });

app.get('/', (req, res) => {
    res.send("hello from db it's working working")
})

app.listen(port)