import express from 'express'
import mongoose from 'mongoose'
import cors from "cors";

const app = express()
const port = 3000 || process.env.PORT 

app.use(express.json())
app.use(cors())


mongoose.connect('mongodb+srv://test:Abc123@cluster0.t6mtbud.mongodb.net/?retryWrites=true&w=majority');

let todo_schema = mongoose.Schema({
    new_data: String
})
const todo_model = mongoose.model('new_todo', todo_schema);

app.post('/todo', (req, res) => {
    let text = req.body.text
    todo_model.create({new_data:text}, (err,saved) => {
        if(!err){
            res.send({
                data : saved,
                msg:'data saved'
            })
        }
    })
})

app.get('/todo', (req, res) => {
    todo_model.find({}, (err,saved) => {
        if(!err){
            res.send({
                data : saved,
                msg:'data sent'
            })
        }
    })
})

app.delete('/todo', (req, res) => {
    todo_model.deleteMany({}, (err,saved) => {
        if(!err){
            console.log(saved);
            res.send({
                data : saved,
                msg:'data deleted'
            })
        }
    })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})