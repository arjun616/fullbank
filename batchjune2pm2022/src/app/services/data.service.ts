import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const option ={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //curent user

  currentUser:any;

  //CURRENT ACCOUNT NUMBER

  currentAcno:any

  //databse
database:any={
  1000:{acno:1000,username:'Neer',password:1000,balance:5000,transaction:[]},
  1001:{acno:1001,username:'Laisha',password:1001,balance:6000,transaction:[]},
  1002:{acno:1002,username:'Vyom',password:1002,balance:5000,transaction:[]}
}

  constructor(private http:HttpClient) { 
    // this.getDetails()
  }

  //saveDetails
  saveDetails(){
    localStorage.setItem('database',JSON.stringify(this.database))

    if(this.currentUser){
      localStorage.setItem('currentUser',JSON.stringify(this.currentUser))
    }

    if(this.currentAcno){
      localStorage.setItem('currentAcno',JSON.stringify(this.currentAcno))
    }

  }


 

  // //getDetails
  // getDetails(){
  //   this.database = JSON.parse(localStorage.getItem('database') || '')

  // if(localStorage.getItem('currentUser'))
  // { 
  //    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '')   
  // }

  // if(localStorage.getItem('currentAcno'))
  // {
  //   this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || '')

  // }
  // }

  //register
  register(username:any,acno:any,password:any){

    const body = {
      username,
      acno,
      password
    }

    return this.http.post('http://localhost:3000/register',body)
    // let userDetails = this.database
   // if(acno in userDetails){
    //   return false
    // }
    // else{
    //   userDetails[acno] = {
    //     acno,
    //     username,
    //     password,
    //     balance:0 ,
    //     transaction : []
    //   }
    //   this. saveDetails()
    //   return true
     
    // }
  }

  //login
  login(acno:any,pswd:any){

    const body = {
      acno,
      pswd
    }
    return this.http.post('http://localhost:3000/login',body)



    // let userDetails = this.database
    // if(acno in userDetails){
    //   if(pswd == userDetails[acno]['password']){
    //   this.currentUser = userDetails[acno]['username']
    //     this.currentAcno = acno
    //     this.saveDetails()
    //    return true
    //   }
    //   else{
    //     alert('Incorrect password')
    //     return false
    //   }
    // }
    // else{
    //   alert('user does not exist')
    //   return false
    // }
  }

  deposit(acno:any,pswd:any,amt:any){

    const body = {
      acno,
      pswd,
      amt
    }
    return this.http.post('http://localhost:3000/deposit',body,this.gettoken())




    // let userDetails = this.database
    // const amount = parseInt(amt)
    // if(acno in userDetails){
    //   if(pswd == userDetails[acno]['password']){
    //    userDetails[acno]['balance']+=amount
    //    userDetails[acno]['transaction'].push({type:'CREDIT',amount})
    //    this.saveDetails()
    //    return userDetails[acno]['balance']
    //   }
    //   else{
    //     alert('Incorrect password')
    //     return false
    //   }
    // }
    // else{
    //   alert('user does not exist')
    //   return false
    // }
  }

  gettoken() {
    //get tocken
    var token = JSON.parse(localStorage.getItem('token') || '')
    //create request header 
    let headers = new HttpHeaders()
    headers = headers.append('x-access-token',token)
    //function over loading
    option.headers=headers
    return option
  }

  withdraw(acno:any,pswd:any,amt:any){

    let userDetails = this.database
    const amount = parseInt(amt)
    if(acno in userDetails){
      if(pswd == userDetails[acno]['password']){
        if(userDetails[acno]['balance']>amount){
          userDetails[acno]['balance']-=amount
          userDetails[acno]['transaction'].push({type:'DEBIT',amount})
          this.saveDetails()
          return userDetails[acno]['balance']

        }
        else{
          alert('insufficient balance')
        }
      
      }
      else{
        alert('Incorrect password')
        return false
      }
    }
    else{
      alert('user does not exist')
      return false
    }
  }

  gettransaction(acno:any)
  {

    return this.database[acno].transaction

  }




}
