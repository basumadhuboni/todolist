const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Update todo
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate(id, { done: true }, { new: true }) // Use new: true to return updated document
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err));
});

// Delete todo
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete(id)
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err));
});

// Get all todos to display in the list obtained from home.jsx
app.get('/get', (req, res) => {
    TodoModel.find()
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err));
});

// Add a new todo object to db..got from create.jsx
app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({ task: task })
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err));
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
