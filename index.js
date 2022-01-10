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
      const allEvent = database.collection('addEvent');
      const allPost = database.collection('allPost');



        // add teachers
        app.post('/teachers', async (req,res)=>{
          const name= req.body.name;
          const education = req.body.education;
          const subject = req.body.subject;
          const phone = req.body.phone;
          const about = req.body.about;
          const age = req.body.age;
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
              age,
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


      // get teachers management
      app.get('/getTeachersInfo', async (req,res)=>{
        const result = await teachers.find({}).toArray()
        res.send(result)
      })

      // delete teachers
      app.delete("/deleteTeacher/:id", async (req,res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)}
        const result = await teachers.deleteOne(query)
        res.send(result)
      })


      // add event 
      app.post('/addEvent', async (req,res)=>{
        const title= req.body.title;
        const description = req.body.description;
        const location = req.body.location;
        const date = req.body.date;
        const picture = req.files.image;
        const pictureData = picture.data;
        const encodedPicture = pictureData.toString('base64')
        const imageBuffer = Buffer.from(encodedPicture, 'base64')
        const addEvent = {
          title,
          description,
          location,
          date,
          image: imageBuffer
        }
        const result = await allEvent.insertOne(addEvent)
        
        res.json(result)
    })


      // get event 
    app.get('/getEvent', async (req,res)=>{
        const result = await allEvent.find({}).toArray()
        res.send(result)
    })

    // delete event 
    app.delete("/deleteEvent/:id", async (req,res)=>{
      const id =req.params.id;
      const query = {_id: ObjectId(id)}
      const result = await allEvent.deleteOne(query)
      res.send(result)
    })


        // new post

        // add teachers
        app.post('/newPost', async (req,res)=>{
          const title= req.body.title;
          const post = req.body.post;
          const user = req.body.user;
          const date = req.body.date;
          const picture = req.files.image;
          const pictureData = picture.data;
          const encodedPicture = pictureData.toString('base64')
          const imageBuffer = Buffer.from(encodedPicture, 'base64')
          const services = {
            title,
            post,
              user,
              date,
              image: imageBuffer
          }
          const result = await allPost.insertOne(services)
          
          res.json(result)
      })


      
      // get post
      app.get("/morePost", async (req,res)=>{
        const result = await allPost.find({}).toArray()
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
    console.log(`Example it `)
  })