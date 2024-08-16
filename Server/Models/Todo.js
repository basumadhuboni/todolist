const mongoose=require('mongoose')
//creating a new schema in mongodb compass 
const TodoSchema=new mongoose.Schema({
    task:String,
    done:{
        type:Boolean,
        default:false
    }
})
// from now on the newly created database and collections will together be called TodoModel
const TodoModel = mongoose.model("todos", TodoSchema)
module.exports=TodoModel