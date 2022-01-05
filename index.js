const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb');
// const fileUpload= require('express-fileupload');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
require('dotenv').config()
// app.use(fileUpload())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z45ex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log("database connected")


async function run() {
    try {
      await client.connect();
      const database = client.db('studyTeamScic');
      const teachers = database.collection('teachers');
      const classes = database.collection('classes');



    //   post teacher
    app.post('/teacher', async (req,res)=>{
        const query = req.body;
        const result = await teachers.insertOne(query)
        res.send(result)
    })

      //   get all product
    app.get('/allData', async (req,res)=>{
        const result = await teachers.find({}).toArray()
        res.send(result)
    })

      
     
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('study server')
  })
  
  app.listen(port, () => {
    console.log(`Example `)
  })