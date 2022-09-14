// import mongoose

const mongoose = require('mongoose')

//to connect server with mongodb

mongoose.connect('mongodb://localhost:27017/bank',() => {
    console.log('mongodb connected');
})


//create a model or collection

const User = mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})

//export

module.exports = {
    User
}