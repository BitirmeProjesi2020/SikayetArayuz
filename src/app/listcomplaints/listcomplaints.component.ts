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
  kullanicilarList: Kullanicilar[] = [];
  sikayetlerList: Sikayetler[] = [];
  kategorilerList: Kategoriler[] = [];

  selectedBankalar: Bankalar[] = [];
  selectedKategori: Kategoriler[] = [];

  constructor(private router: Router,
              private cookieService: CookieService,
              private bankalarService: BankalarService,
              private kategorilerService: KategorilerService,
              private sikayetlerService: SikayetlerService,
              private kullanicilarService: KullanicilarService) {
  }


  ngOnInit(): void {
    this.getKategoriler();
    this.controlCalisan();
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

  filterBank($event) {
    if (this.bankalarList === this.selectedBankalar) {
      this.selectedBankalar = [];
    }
    if ($event.target.checked === true) {
      let flag = true;
      this.selectedBankalar.forEach(bank => {
        if (bank.id === Number($event.target.value)) {
          flag = false;
        }
      });
      if (flag === true) {
        this.bankalarService.getById($event.target.value).pipe().subscribe((data) => {
          this.selectedBankalar[this.selectedBankalar.length] = data;
          this.getSikayetler();
        });
      }
    } else if ($event.target.checked === false) {
      this.removeBank(Number($event.target.value));
      if (this.selectedBankalar.length === 0) {
        this.selectedBankalar = this.bankalarList;
      }
      this.getSikayetler();
    }
  }

  filterKategori($event) {
    if (this.kategorilerList === this.selectedKategori) {
      this.selectedKategori = [];
    }
    if ($event.target.checked === true) {
      let flag = true;
      this.selectedKategori.forEach(kategori => {
        if (kategori.id === Number($event.target.value)) {
          flag = false;
        }
      });
      if (flag === true) {
        this.kategorilerService.getById($event.target.value).pipe().subscribe((data) => {
          this.selectedKategori[this.selectedKategori.length] = data;
          this.getSikayetler();
        });
      }
    } else if ($event.target.checked === false) {
      this.removeKategori(Number($event.target.value));
      if (this.selectedKategori.length === 0) {
        this.selectedKategori = this.kategorilerList;
      }
      this.getSikayetler();
    }
  }

  getBankalar() {
    this.bankalarService.getAll().pipe().subscribe((data: Bankalar[]) => {
      this.bankalarList = data;
      this.selectedBankalar = data;
      this.getSikayetler();
    });
  }

  getKategoriler(): void {
    this.kategorilerService.getAll().pipe().subscribe((data: Kategoriler[]) => {
      this.kategorilerList = data;
      this.selectedKategori = data;
      this.getBankalar();
    });
  }

  getBankSikayetNo(adi: string): number {
    let sayi = 0;
    this.sikayetlerList.forEach(value => {
      if (value.bankaId === adi) {
        sayi++;
      }
    });
    return sayi;
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
    this.sikayetlerList = [];
    this.sikayetlerService.getAll().pipe().subscribe((data: Sikayetler[]) => {
      const tempSikayetler: Sikayetler[] = [];
      data.forEach(sikayet => {
        this.selectedKategori.forEach(kategori => {
          this.selectedBankalar.forEach(banka => {
            if (sikayet.bankaId === banka.id && sikayet.sikayetKategorisi === kategori.id) {
              let flag = true;
              tempSikayetler.forEach(value => {
                if (value === sikayet) {
                  flag = false;
                }
              });
              if (flag === true) {
                tempSikayetler.push(sikayet);
              }
            }
          });
        });
      });
      this.sikayetlerList = tempSikayetler;
      this.getKullanicilar();
      this.bankalarList.forEach(banka => {
        this.sikayetlerList.forEach(sikayet => {
          if (banka.id === sikayet.bankaId) {
            sikayet.bankaId = banka.ad;
          }
        });
      });
    });
  }

  removeBank(id: number): void {
    for (let i = 0; i < this.selectedBankalar.length; i++) {
      if (this.selectedBankalar[i].id === id) {
        this.selectedBankalar.splice(i, 1);
      }
    }
  }

  removeKategori(id: number) {
    for (let i = 0; i < this.selectedKategori.length; i++) {
      if (this.selectedKategori[i].id === id) {
        this.selectedKategori.splice(i, 1);
      }
    }
  }

  showDetailComp(compId: number) {
    this.router.navigate(['/sikayet-detay/' + compId]);
  }
}
