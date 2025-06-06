import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config({ path: 'dotenv.env' });

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answers: [String]
})



await mongoose.connect(process.env.DSN)


console.log('connecting to database', process.env.DSN)

const Question = mongoose.model("Questions", QuestionSchema)
export default Question

