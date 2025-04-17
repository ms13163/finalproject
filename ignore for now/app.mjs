import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Question from './db.mjs';
import word from './db.mjs';
import user from './db.mjs';
import './config.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

// Serve static files from 'public'
app.use(express.static(join(__dirname, 'public')));

// Explicitly route '/' to index.html
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.post('/questions/', async (req, res) => {
  console.log('POST /questions/ hit. req.body:', req.body);
  // TODO: finish implementation
  const newQuestion=new Question({
     console.log('POST /questions/ hit. req.body:', req.body);
    question: req.body.question,
  answers: []
  })
  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion); // Respond with the created question
  } catch (e) {
    res.status(500).json({ error: 'Failed to add question' });
  }
})

app.post('/questions/:id/answers/', async (req, res) => {
  const update = { "$push": { answers: req.body.answer } }
  try {
    const result = await Question.findByIdAndUpdate(req.params.id, update, { "new": true })
    res.json({ success: 'Added an answer' })
  } catch(e) {
    res.status(500).json({ error: 'Failed to add answer' })
  }
})

app.get('/questions/', async (req, res) => {
  try {
    const questions = await Question.find(); // Retrieve all questions
    res.json(questions); // Respond with the list of questions
  } catch (e) {
    res.status(500).json({ error: 'Failed to retrieve questions' });
  }
})

app.listen(3000, () => console.log('Running on http://localhost:3000'));