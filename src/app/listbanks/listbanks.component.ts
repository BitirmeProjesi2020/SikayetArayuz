import { Component, OnInit } from '@angular/core';
import {Bankalar} from '../models/bankalar.model';
import {BankalarService} from '../services/bankalar.service';

@Component({
  selector: 'app-listbanks',
  templateUrl: './listbanks.component.html',
  styleUrls: ['./listbanks.component.css']
})
export class ListbanksComponent implements OnInit {

  bankalarList: Bankalar[];

  constructor(private bankalarService: BankalarService) { }

  ngOnInit(): void {
    this.getBankalar();
  }

  getBankalar(): void {
    this.bankalarService.getAll().pipe().subscribe((data: Bankalar[]) => {
      this.bankalarList = data;
    });
  }
  
}
