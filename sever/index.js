const { MongoClient } = require("mongodb");
const mongoose = require("mongoose")
const express = require("express")


const app = express()

const DBuri = "mongodb+srv://conorohare5678:Capslock1@cluster0.axpysal.mongodb.net/";

//test
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose
    .connect(DBuri, connectionParams)
    .then(() => {
        console.info("Connected to DB");
    })
    .catch((e) => {
        console.log("error: ", e)
    })

app.use(express.json())

const taskRoutes = require('../routes/tasks');
const taskModel = require("../models/tasks_model")
app.use('/tasks', taskRoutes)

app.listen(5001, () => console.log('server started'))

// // Replace the uri string with your connection string.
// const uri = "mongodb+srv://conorohare5678:Capslock1@cluster0.axpysal.mongodb.net/";

// const client = new MongoClient(uri);

// async function run() {
//     try {
//         const database = client.db('sample_mflix');
//         const movies = database.collection('movies');

//         // Query for a movie that has the title 'Back to the Future'
//         const query = { title: 'Back to the Future' };
//         const movie = await movies.findOne(query);

//         console.log(movie);
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);