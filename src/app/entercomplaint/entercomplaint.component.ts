import { Component, OnInit } from '@angular/core';
import { Bankalar } from '../models/bankalar.model';
import { BankalarService } from '../services/bankalar.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Sikayetler } from '../models/sikayetler.model';
import { SikayetlerService } from '../services/sikayetler.service';

@Component({
  selector: 'app-entercomplaint',
  templateUrl: './entercomplaint.component.html',
  styleUrls: ['./entercomplaint.component.css']
})
export class EntercomplaintComponent implements OnInit {

  bankalarList: Bankalar[];
  baslik: string;
  detay: string;
  musteri: boolean = false;
  telNo: string;

  constructor(private bankalarService: BankalarService,
    private cookieService: CookieService,
    private router: Router,
    private sikayetlerService: SikayetlerService) { }

  ngOnInit(): void {
    this.controlMusteri();
    this.getBankalar();
  }

  controlMusteri(){
    if(this.cookieService.get('uyeTipi') === "musteri"){
      this.musteri = true;
      console.log("Musteri giris yapti.");
    }
    else{
      this.musteri = false;
      console.log("Musteri giris yapmadi veya calisan giris yaptı.");
    }
  }

  getBankalar(): void {
    this.bankalarService.getAll().pipe().subscribe((data: Bankalar[]) => {
      this.bankalarList = data;
      console.log(this.bankalarList);
    });
  }

  sendComp() {
    if (this.musteri) {
      const sikayet = new Sikayetler(1, this.baslik, this.telNo, this.detay, 1, false, true, 1);
      this.sikayetlerService.add(sikayet).pipe().subscribe((data) => {
        console.log('Kayıt edildi');
        this.router.navigate(['/sikayetler']);
      });
    }
    else{
      this.ngOnInit();
    }
  }
}
