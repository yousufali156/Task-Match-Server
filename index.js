const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@yousufwebdev.u6jkoch.mongodb.net/?retryWrites=true&w=majority&appName=YousufWebDev`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const db = client.db('assign-10-grapes');
    const tasksCollection = db.collection('tasks');

    // 📌 GET all tasks
    app.get('/tasks', async (req, res) => {
      const result = await tasksCollection.find().toArray();
      res.send(result);
    });

    // 📌 GET top 6 tasks
    app.get('/tasks/top', async (req, res) => {
      const result = await tasksCollection.find().limit(6).toArray();
      res.send(result);
    });

    // 📌 GET a task by ID
    app.get('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const result = await tasksCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // 📌 POST a new task
    app.post('/tasks', async (req, res) => {
      const newTask = req.body;
      const result = await tasksCollection.insertOne(newTask);
      res.send(result);
    });

    // 📌 PUT update a task
    app.put('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const updatedTask = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: updatedTask,
      };
      const result = await tasksCollection.updateOne(filter, updatedDoc, options);
      res.send(result);
    });

    // 📌 DELETE a task
    app.delete('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // ✅ Confirm successful DB connection
    // await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB!");
  } finally {
    // Optionally close the DB client if you want:
    // await client.close();
  }
}

run().catch(console.dir);

// Root endpoint
app.get('/', (req, res) => {
  res.send('🍇 Grapes Task Server Running!');
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
