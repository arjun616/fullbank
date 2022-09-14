import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  acno:any

  transaction: any

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    //get the current acno
    this.acno = this.dataService.currentAcno
    this.transaction = this.dataService.gettransaction(this.acno)
    console.log(this.transaction);
    
  }

}
