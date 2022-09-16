import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  header="Welcome to Our Bank......"
  accPlaceholder ="Account please"
  amount ="amount please"
  //acno 
  // acno=""
  
  //pswd
  // pswd=""

  //form group

  depositForm = this.formBuilder.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  })



  
  withdrawForm = this.formBuilder.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  })

  user:any;

  acno:any;




  constructor(private formBuilder:FormBuilder,private dataService:DataService,private router:Router) { }

  ngOnInit(): void {
    // this.user = this.dataService.currentUser
    this.user = JSON.parse(localStorage.getItem('currentUser') || '')

    if(!localStorage.getItem('currentAcno'))
    {
      alert('please log in')
      this.router.navigateByUrl('')
    }
  }


  deposit(){

    //fetch acno 
    var acno = this.depositForm.value.acno
    //fetch pswd
    var pswd = this.depositForm.value.pswd

    var amount = this.depositForm.value.amount

    if(this.depositForm){
      this.dataService.deposit(acno,pswd,amount)
      .subscribe((result:any) => {
        alert(result.message)
      },
      result => {
        alert (result.error.message)
      })
    }
    else{
      alert('invalid form')
    }
    
    // if(this.depositForm.valid){
    //   const result = this.dataService.deposit(acno,pswd,amount)
    //   if(result){
    //     alert(`${amount} deposited sucessfully and new balance is ${result}`)
    //   }
   
    // }

    // else{
    //   alert('invalid form')
    // }
  
  }

  withdraw(){

    //fetch acno 
    var acno = this.withdrawForm.value.acno
    //fetch pswd
    var pswd = this.withdrawForm.value.pswd

    var amount = this.withdrawForm.value.amount
    
    if(this.withdrawForm.valid){
    //logic
    const result = this.dataService.withdraw(acno,pswd,amount)
    if(result){
      alert(`${amount} deposited sucessfully and new balance is ${result}`)
    }

    }

    else{
      alert('invalid form')
    }
  
  }

  logout(){
    localStorage.removeItem('currentAcno')
    localStorage.removeItem('currentUsername')
    this.router.navigateByUrl('')
  }

  deleteAcc(){

    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '')
    
  }
  
cancel()
{
  this.acno=''
}

delete(event:any){
  alert(`from parent dashboard ${event}`)

}



}

