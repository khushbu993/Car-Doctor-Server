const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('mongodb').ObjectID;
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qagzg.mongodb.net/carDoctorDB?retryWrites=true&w=majority`;


const app = express()

app.use(bodyParser.json());
app.use(cors());

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 5000;

client.connect(err => {
    const serviceCollection = client.db("carDoctorDB").collection("services");
    const reviewsCollection = client.db("carDoctorDB").collection("reviews");
    const appointmentCollection = client.db("carDoctorDB").collection("appointments");
    console.log('database connected successfully');

    //post api for data load addService
    app.post('/addService', (req, res) => {
        const newService = req.body;
        console.log('added new Service:', newService);
        serviceCollection.insertOne(newService)
            .then(result => {
                console.log('inserted Count', result.insertedCount)
                res.send(result.insertedCount > 0)
            })
    });

    //get api for display data displayService
    app.get('/services', (req, res) => {
        serviceCollection.find({})
            .toArray((err, services) => {
                res.send(services);
                console.log('from database', services);
            })
    });

    //post api for data load addReview
    app.post('/addReview', (req, res) => {
        const newReview = req.body;
        console.log('added new Review:', newReview);
        reviewsCollection.insertOne(newReview)
            .then(result => {
                console.log('inserted Count', result.insertedCount)
                res.send(result.insertedCount > 0)
            })
    });

    //get api for display data displayReview
    app.get('/reviews', (req, res) => {
        reviewsCollection.find({})
            .toArray((err, reviews) => {
                res.send(reviews);
                console.log('from database', reviews);
            });
    });

    //post api create appointment
    app.post('/addAppointment', (req, res) => {
        const appointments = req.body;
        // console.log(products);
        appointmentCollection.insertOne(appointments)
            .then(result => {
                // console.log(result.insertedCount);
                res.send(result.insertedCount > 0);
            })
    });
});


app.get('/', (req, res) => {
    res.send("hello from db it's working working")
})

app.listen(port)