//Import express

const express = require('express')

//import DataService
const dataService = require('./services/dataService')

const jwt = require('jsonwebtoken')

const cors = require('cors')


//using express create server application 

const app = express()

app.use(cors({
    orgin:'http://localhost:4200'
}))

//to parse json data
app.use(express.json())

// const appMiddleWare = (req,res,next) => {
//     console.log('inside application middleware');
// }
// app.use(appMiddleWare)


//HTTP 
//HTTP Response Code
//1xx - Information
//2xx - Success
//3xx - Redirection
//4xx - Client Error
//5xx - Server Error

//router specific middleware

const jwtMiddleWare = (req,res,next) => {
    console.log('inside jwtMiddleWare');
    //to fetch token
    const token = req.headers['x-access-token']
    console.log(token);
    //verify token -verify()
    try{
        const data = jwt.verify(token,'suppersecretkey12345')
        console.log(data);
        next()
    }
    catch{
        res.status(404).json({
            statusCode:404,
            status:true,
            message:'please log in'
        })
    }
}

//get - To read 

//app.get('/',(req,res)=>{res.send('GET METHOD')})

//post
//app.post('/',(req,res)=>{res.send('POST METHOD')})

//put
//app.put('/',(req,res)=>{res.send('PUT METHOD')})

//patch
//app.patch('/',(req,res)=>{res.send('PATCH METHOD')})

//delete
//app.delete('/',(req,res)=>{res.send('DELETE METHOD')})

//bankapp

//register API
app.post('/register',(req,res)=>{
    console.log(req.body);
    //asynchronous
    dataService.register(req.body.username,req.body.acno,req.body.password)
    .then(result=> {
        console.log(result);
        // res.send("done")
            res.status(result.statusCode).json(result)
    })
    

})


//login

// app.post('/login',(req,res)=>{
//     console.log(req.body);
//     const result = dataService.login(req.body.acno,req.body.pswd)
//     res.status(result.statusCode).json(result)
// })


app.post('/login',(req,res)=>{
    console.log(req.body);
    //asyncronous
    dataService.login(req.body.acno,req.body.pswd)
    .then(result => {
        console.log(result);
        res.status(result.statusCode).json(result)
    })

})


//deposit

app.post('/deposit',jwtMiddleWare,(req,res)=>{
    console.log(req.body);
    dataService.deposit(req.body.acno,req.body.pswd,req.body.amt)
    .then(result =>{
        console.log(result);
        res.status(result.statusCode).json(result)

    })
})

app.post('/withdraw',(req,res)=>{
    console.log(req.body);
    dataService.withdraw(req.body.acno,req.body.pswd,req.body.amt)
    .then(result => {
    console.log();
    res.status(result.statusCode).json(result)

    })
})

//transaction
app.post('/transaction',(req,res)=>{
    console.log(req.body);
    dataService.gettransaction(req.body.acno)
    .then(result => {
        console.log();
        res.status(result.statusCode).json(result)
    })
   
})




//Set Port Number inorder to run this applicstion

app.listen(3000,()=>{console.log('Server Started at 3000');})
