import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SikayetlerService} from '../services/sikayetler.service';
import {Sikayetler} from '../models/sikayetler.model';
import {BankalarService} from '../services/bankalar.service';
import {Bankalar} from '../models/bankalar.model';

@Component({
  selector: 'app-listcomplaints',
  templateUrl: './listcomplaints.component.html',
  styleUrls: ['./listcomplaints.component.css']
})
export class ListcomplaintsComponent implements OnInit {

  sikayetlerList: Sikayetler[];
  bankalarList: Bankalar[];

  constructor(private router: Router,
              private bankalarService: BankalarService,
              private sikayetlerService: SikayetlerService) {
  }


  ngOnInit(): void {
    this.getSikayetler();
  }

  clickEnterComp() {
    this.router.navigate(['/yeni-sikayet']);
  }

  getBankalar() {
    this.bankalarService.getAll().pipe().subscribe((data: Bankalar[]) => {
      this.bankalarList = data;
      this.bankalarList.forEach(banka => {
        this.sikayetlerList.forEach(sikayet => {
          if (banka.id === sikayet.bankaId) {
            sikayet.bankaId = banka.ad;
          }
        });
      });
    });
  }

  getSikayetler(): void {
    this.sikayetlerService.getAll().pipe().subscribe((data: Sikayetler[]) => {
      this.sikayetlerList = data;
      console.log(this.sikayetlerList);
      this.getBankalar();
    });
  }

  showDetailComp(compId: number) {
    this.router.navigate(['/sikayet-detay/' + compId]);
  }
}
