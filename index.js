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



// All is okey 



async function run() {
  try {
    const db = client.db('assign-10-grapes');
    const tasksCollection = db.collection('tasks');
    const usersCollection = db.collection('users');

    // 📌 Save a new user (only if not exists)
    app.post('/users', async (req, res) => {
      const user = req.body;
      const existing = await usersCollection.findOne({ email: user.email });
      if (existing) {
        return res.status(409).send({ message: 'User already exists' });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

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

    // 📌 PUT update task by ID
    app.put('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const updatedTask = req.body;
      const result = await tasksCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            title: updatedTask.title,
            category: updatedTask.category,
            description: updatedTask.description,
            deadline: updatedTask.deadline,
            budget: updatedTask.budget,
            updatedAt: updatedTask.updatedAt,
          },
        }
      );
      res.send(result);
    });

    // 📌 DELETE a task
    app.delete('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });


    // 📊 GET dashboard stats for a user
    app.get('/dashboard-stats', async (req, res) => {
      try {
        const email = req.query.email;

        if (!email) {
          return res.status(400).send({ message: 'Email is required' });
        }

        const addedCount = await tasksCollection.estimatedDocumentCount();
        const browseableCount = await tasksCollection.countDocuments(); // Or filter if needed
        const postedCount = await tasksCollection.countDocuments({ createdBy: email });
        const featuredCount = await tasksCollection.countDocuments({ featured: true });

        res.send({
          added: addedCount,
          browseable: browseableCount,
          posted: postedCount,
          featured: featuredCount || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).send({ message: 'Internal server error' });
      }
    });


    console.log("✅ Connected to MongoDB and ready!");
  } catch (error) {
    console.error("❌ Error during server run:", error);
  }
}

run().catch(console.dir);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('🍇 Grapes Task Server Running!');
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
