const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb');
const fileUpload= require('express-fileupload');
const ObjectId = require('mongodb').ObjectId;
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
require('dotenv').config()
app.use(fileUpload())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z45ex.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log("database connected")


async function run() {
    try {
      await client.connect();
      const database = client.db('studyTeamScic');
      const teachers = database.collection('teachers');
      // const classes = database.collection('classes');



        // add teachers
        app.post('/teachers', async (req,res)=>{
          const name= req.body.name;
          const education = req.body.education;
          const subject = req.body.subject;
          const phone = req.body.phone;
          const about = req.body.about;
          const link = req.body.link;
          const picture = req.files.image;
          const pictureData = picture.data;
          const encodedPicture = pictureData.toString('base64')
          const imageBuffer = Buffer.from(encodedPicture, 'base64')
          const services = {
            name,
            education,
              subject,
              phone,
              about,
              link,
              image: imageBuffer
          }
          const result = await teachers.insertOne(services)
          
          res.json(result)
      })

  

      //   get all teachers
      app.get('/allTeachers', async (req,res)=>{
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