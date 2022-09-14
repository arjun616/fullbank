import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // property/variable

  header="Welcome to Our Bank......"
  accPlaceholder ="Account please"
  //acno 
  acno=""
  //pswd
  pswd=""

  //form group

  loginForm = this.formBuilder.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })



  constructor(private formBuilder:FormBuilder,private router:Router,private dataService:DataService) { }

  ngOnInit(): void {
  }

  //user defined function


  login(){

    //fetch acno 
    var acno = this.loginForm.value.acno
    //fetch pswd
    var pswd = this.loginForm.value.pswd
    
    if(this.loginForm.valid){
    const result = this.dataService.login(acno,pswd)

    

    if(result){
      alert("Log In successfull")
      this.router.navigateByUrl('dashboard')
    }}

    else{
      alert('invalid form')
    }
  
  }

 
  

}


