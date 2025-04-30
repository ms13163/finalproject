import mongoose from 'mongoose'
mongoose.connect('mongodb+srv://ms13163:atlas@cluster0.ubyo21g.mongodb.net/atlas?retryWrites=true&w=majority&appName=Cluster0')
console.log("whee")
const userSchema=new mongoose.Schema({
	name: String
})
mongoose.model('User',userSchema)
const User=mongoose.model('User')

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answers: [String]
})



const Question = mongoose.model("Questions", QuestionSchema)
export { Question, User };

// const result=await User.find()
// const result2=await Question.find()
// console.log(result)
// console.log(result2)