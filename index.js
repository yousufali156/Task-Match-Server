require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Logger to debug incoming requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// MongoDB URI
const uri = `mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASS}@yousufwebdev.u6jkoch.mongodb.net/?retryWrites=true&w=majority&appName=YousufWebDev`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

async function run() {
  try {
    // await client.connect();
    // console.log(' Connected to MongoDB');

    const db = client.db('assign-10-grapes');
    const tasksCollection = db.collection('tasks');



    // Get top 6 recipes sorted by likes in descending order
    app.get("/tasks/top", async (req, res) => {
      const topTask = await tasksCollection
        .find()
        .limit(6)
        .toArray();
      res.send(topTask);
    });

    app.get('/tasks', async (req, res) => {
      const result = await tasksCollection.find().toArray();
      res.send(result)
    });


    app.get('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await tasksCollection.findOne(filter);
      res.send(result);

    });


    //  POST /tasks
    app.post('/tasks', async (req, res) => {
      const newTask = req.body;
      console.log('📩 New Task:', newTask);
      const result = await tasksCollection.insertOne(newTask);
      res.status(201).json({ message: 'Task saved!', taskId: result.insertedId });
    });

    // updated functionality
    app.put('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedTask = req.body;
      const updatedDoc = {
        $set: {
          title: updatedTask.title,
          category: updatedTask.category,
          description: updatedTask.description,
          deadline: updatedTask.deadline,
          budget: updatedTask.budget,
          updatedAt: updatedTask.updatedAt,
        }
      }

      const result = await tasksCollection.updateOne(filter, updatedDoc);
      res.send(result);

    });


    // Deleted Id 
    app.delete('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await tasksCollection.deleteOne(filter);
      res.send(result);

    });




    //  Root route
    app.get('/', (req, res) => {
      res.send('🍇 Grapes Task Server Running!');
    });
  } catch (err) {
    // console.error('❌ MongoDB error:', err);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
