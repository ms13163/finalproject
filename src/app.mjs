import './config.mjs'
import mongoose from 'mongoose'
import express from 'express'
import Question from './db.mjs'
import url from 'url'
import path from 'path'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const app = express()

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.json());

// Serve static files from 'public'
// app.use(express.static(join(__dirname, 'public')));



app.post('/questions/', async (req, res) => {
  // TODO: finish implementation
  const newQuestion=new Question({
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

const port = process.env.PORT ?? 3000
app.listen(port, () => {console.log(`Server is listening on ${port}`)})
