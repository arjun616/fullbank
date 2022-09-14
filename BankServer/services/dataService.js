//jsonwebtocken

const jwt = require('jsonwebtoken')




const db = require('./db')

//databse
 database={
    1000:{acno:1000,username:'Neer',password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,username:'Laisha',password:1001,balance:6000,transaction:[]},
    1002:{acno:1002,username:'Vyom',password:1002,balance:5000,transaction:[]}
  }

  // register(username:any,acno:any,password:any){

  //   let userDetails = this.database

  //   if(acno in userDetails){
  //     return false
  //   }
  //   else{
  //     userDetails[acno] = {
  //       acno,
  //       username,
  //       password,
  //       balance:0 ,
  //       transaction : []
  //     }
  //     this. saveDetails()
  //     return true
 //   }
  // }

  const register = (username,acno,password) => {

    return db.User.findOne({
      acno
    }).then(result=>{
      // console.log(result);
      if(result){
        return {
          statusCode:404,
          status:false,
          message:'user alredy exist!!! please log in'
        }
      }
      else{
        const newUser = new db.User({
          acno,
          username,
          password,
          balance:0,
          transaction:[]
        })
    
        newUser.save()
      return {
        statusCode:200,
        status:true,
        message:'Registered Successfully'
      }
     
    }
  })
  
  }

  //login

  const login = (acno,pswd)=>{

    return db.User.findOne({
      acno,
      password:pswd
    }).then(result => {

      if(result){

        currentUser = result.username
        currentAcno = acno

        //tocken genertaion - sign()
        const token =  jwt.sign({
          currentAcno:acno
        },'suppersecretkey12345')
       return {
        statusCode:200,
        status:true,
        message:'login successfully',
        currentUser,
        currentAcno,
        token
       }
      }
      else{
        return {
          statusCode:404,
          status:false,
          message:'Incorrect Password'
        }
      }
    }
  ) 
}

  const deposit = (acno,pswd,amt) => {

    const amount = parseInt(amt)
    return db.User.findOne({
      acno,
      password:pswd
    }).then(result => {

      if(result) {
        result.balance += amount
        result.transaction.push({
          type:'CREDIT',
          amount
        })
        result.save()
       return {
        statusCode:200,
        status:true,
        message:`${amount} deposited sucessfully and your new balance is ${result.balance}`
        }
      }
      else{
        return {
          statusCode:404,
          status:false,
          message:'Incorrect account number or password'
        }
      }

    })
    }

  const withdraw = (acno,pswd,amt) => {

    const amount = parseInt(amt)
    return db.User.findOne({
      acno,
      password:pswd,
    }).then(result => {

      if(result){
          if(result.balance > amount){
            result.balance -= amount
            result.transaction.push({
              type:'DEBIT',
              amount
            })      
            result.save()   
              return{
              statusCode:200,
              status:true,
              message: `${amount} Debited sucessfully and your new balance is ${result.balance}`
  
            } 
  
          }
          else{
            return {
              statusCode:404,
              status:false,
              message:'In Sufficient Balance'
            }
          }
        
        }
        else{
          return {
            statusCode:404,
            status:false,
            message:'Incorrect Password'
          }
        }
      }
     

    )
   
  }

  
  const gettransaction = (acno) =>{

    return db.User.findOne({
      acno
    }).then(result => {
      if(result){
        return {
          statusCode:200,
          status:true,
          transaction:result.transaction

        }
      }
      else{
        return{
          statusCode:404,
        status:false,
        message:'user does not exist'

        }
      }
    })

  }


  module.exports={
    register,
    login,
    deposit,
    withdraw,
    gettransaction
  }