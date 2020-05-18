import { Component, OnInit } from '@angular/core';
import { Bank } from '../listbanks/bank';

@Component({
  selector: 'app-entercomplaint',
  templateUrl: './entercomplaint.component.html',
  styleUrls: ['./entercomplaint.component.css']
})
export class EntercomplaintComponent implements OnInit {

  constructor() { }

  banks: Bank[] = [];

  ngOnInit(): void {
    this.banks = [
      { bankId: 1, bankName: 'A Bank', bankTotalComp: 1200, bankSolvedComp: 1000, happyRate: 98 },
      { bankId: 2, bankName: 'B Bank', bankTotalComp: 1300, bankSolvedComp: 1000, happyRate: 99 },
      { bankId: 3, bankName: 'C Bank', bankTotalComp: 1400, bankSolvedComp: 1000, happyRate: 97 },
      { bankId: 4, bankName: 'D Bank', bankTotalComp: 1500, bankSolvedComp: 1000, happyRate: 96 },
      { bankId: 5, bankName: 'E Bank', bankTotalComp: 1600, bankSolvedComp: 1000, happyRate: 95 },
      { bankId: 6, bankName: 'F Bank', bankTotalComp: 1700, bankSolvedComp: 1000, happyRate: 94 },
      { bankId: 7, bankName: 'G Bank', bankTotalComp: 1800, bankSolvedComp: 1000, happyRate: 93 }
    ]
  }
  
  //Gönder button'unun fonk.
  sendComp(){
    
  }

}
