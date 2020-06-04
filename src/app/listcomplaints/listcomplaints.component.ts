import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {SikayetlerService} from '../services/sikayetler.service';
import {Sikayetler} from '../models/sikayetler.model';
import {BankalarService} from '../services/bankalar.service';
import {Bankalar} from '../models/bankalar.model';
import {Kullanicilar} from '../models/kullanicilar.model';
import {KullanicilarService} from '../services/kullanicilar.service';
import {Kategoriler} from '../models/kategoriler.model';
import {KategorilerService} from '../services/kategoriler.service';

@Component({
  selector: 'app-listcomplaints',
  templateUrl: './listcomplaints.component.html',
  styleUrls: ['./listcomplaints.component.css']
})
export class ListcomplaintsComponent implements OnInit {

  bankalarList: Bankalar[];
  calisan: boolean;
  kullanicilarList: Kullanicilar[];
  sikayetlerList: Sikayetler[];
  kategorilerList: Kategoriler[];

  constructor(private router: Router,
              private cookieService: CookieService,
              private bankalarService: BankalarService,
              private kategorilerService: KategorilerService,
              private sikayetlerService: SikayetlerService,
              private kullanicilarService: KullanicilarService) {
  }


  ngOnInit(): void {
    this.getSikayetler();
    this.controlCalisan();
    this.getKategoriler();
  }

  clickEnterComp() {
    this.router.navigate(['/yeni-sikayet']);
  }

  controlCalisan() {
    if (this.cookieService.get('uyeTipi') === 'calisan') {
      this.calisan = true;
    } else {
      this.calisan = false;
    }
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

  getKategoriler(): void {
    this.kategorilerService.getAll().pipe().subscribe((data: Kategoriler[]) => {
      this.kategorilerList = data;
    });
  }

  getKategoriSikayetNo(id: number): number {
    let sayi = 0;
    this.sikayetlerList.forEach(value => {
      if (value.sikayetKategorisi === id) {
        sayi++;
      }
    });
    return sayi;
  }

  getKullanicilar(): void {
    this.kullanicilarService.getAll().pipe().subscribe((data: Kullanicilar[]) => {
      this.kullanicilarList = data;
      this.kullanicilarList.forEach(kullanici => {
        this.sikayetlerList.forEach(sikayet => {
          if (kullanici.id === sikayet.kullanici) {
            sikayet.kullanici = kullanici.adSoyad;
          }
        });
      });
    });
  }

  getSikayetler(): void {
    this.sikayetlerService.getAll().pipe().subscribe((data: Sikayetler[]) => {
      this.sikayetlerList = data;
      this.getBankalar();
      this.getKullanicilar();
    });
  }

  showDetailComp(compId: number) {
    this.router.navigate(['/sikayet-detay/' + compId]);
  }
}
