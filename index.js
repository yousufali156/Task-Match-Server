require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve favicon to avoid 404
app.use('/favicon.ico', express.static(path.join(__dirname, 'favicon.ico')));

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
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('assign-10-grapes');
    const tasksCollection = db.collection('tasks');

    // GET top 6 tasks
    app.get("/tasks/top", async (req, res) => {
      const topTasks = await tasksCollection.find().limit(6).toArray();
      res.send(topTasks);
    });

    // GET all tasks
    app.get('/tasks', async (req, res) => {
      const result = await tasksCollection.find().toArray();
      res.send(result);
    });

    // GET a single task by ID
    app.get('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const task = await tasksCollection.findOne({ _id: new ObjectId(id) });
      res.send(task);
    });

    // POST a new task
    app.post('/tasks', async (req, res) => {
      const newTask = req.body;
      console.log('📩 New Task:', newTask);
      const result = await tasksCollection.insertOne(newTask);
      res.status(201).json({ message: 'Task saved!', taskId: result.insertedId });
    });

    // PUT update task by ID
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

    // DELETE a task by ID
    app.delete('/tasks/:id', async (req, res) => {
      const id = req.params.id;
      const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Root route
    app.get('/', (req, res) => {
      res.send('🍇 Grapes Task Server Running!');
    });

    // 404 handler (optional)
    app.use((req, res) => {
      res.status(404).send('🔍 Not Found');
    });

  } catch (err) {
    console.error('❌ MongoDB error:', err);
  }
}

run().catch(console.dir);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
