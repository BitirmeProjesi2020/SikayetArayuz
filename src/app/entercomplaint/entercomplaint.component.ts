import {Component, OnInit} from '@angular/core';
import {Bankalar} from '../models/bankalar.model';
import {BankalarService} from '../services/bankalar.service';
import {Sikayetler} from '../models/sikayetler.model';
import {SikayetlerService} from '../services/sikayetler.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-entercomplaint',
  templateUrl: './entercomplaint.component.html',
  styleUrls: ['./entercomplaint.component.css']
})
export class EntercomplaintComponent implements OnInit {

  bankalarList: Bankalar[];
  baslik: string;
  telNo: string;
  detay: string;

  constructor(private bankalarService: BankalarService,
              private sikayetlerService: SikayetlerService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getBankalar();
  }

  getBankalar(): void {
    this.bankalarService.getAll().pipe().subscribe((data: Bankalar[]) => {
      this.bankalarList = data;
      console.log(this.bankalarList);
    });
  }

  sendComp() {
    const sikayet = new Sikayetler(1, this.baslik, this.telNo, this.detay, 1, false, true, 1);
    this.sikayetlerService.add(sikayet).pipe().subscribe((data) => {
      console.log('Kayıt edildi');
      this.router.navigate(['/sikayetler']);
    });
  }
}
