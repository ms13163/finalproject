import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
});

const WordSchema = new mongoose.Schema({
canto:{type:String, required:true},
english:{type:String, required:true},
tags:[String]

});

const QuestionSchema=new mongoose.Schema({
// username:{type:String, required:true}, 
 question:{type:String, required:true},
 answers:[String]
})

await mongoose.connect(process.env.DSN);
console.log('connecting to database', process.env.DSN);

const word = mongoose.model("Words", WordSchema);
const user = mongoose.model("Users", UserSchema);
const Question = mongoose.model("questionfinal", QuestionSchema);
// export word;
// export user;
export default Question;