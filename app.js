const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/signup').then(()=> console.log("connected to db")).catch(()=>console.log("error which connecting to db"))
const db = mongoose.connection;

app.listen(3000, ()=>{
    console.log("listening on 3000")
})

app.get('/', (req,res)=>{
    return res.redirect('index.html')
})
app.post('/sign_up', (req,res)=>{
    const name = req.body.name;
    const mobilenumber = req.body.mobilenumber;
    const password = req.body.password;
    const data = {
        "name": name,
        "mobilenumber": mobilenumber,
        "password": password
    }

    db.collection('users').insertOne(data);
    return res.redirect('success.html')
})