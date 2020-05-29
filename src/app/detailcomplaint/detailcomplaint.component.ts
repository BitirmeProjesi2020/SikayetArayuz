import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SikayetlerService} from '../services/sikayetler.service';
import {Sikayetler} from '../models/sikayetler.model';
import {BankalarService} from '../services/bankalar.service';
import {Bankalar} from '../models/bankalar.model';
import {Kullanicilar} from '../models/kullanicilar.model';
import {KullanicilarService} from '../services/kullanicilar.service';
import {Kategoriler} from '../models/kategoriler.model';
import {KategorilerService} from '../services/kategoriler.service';
import {CalisanCevaplari} from '../models/calisanCevaplari.model';
import {CalisanCevaplariService} from '../services/calisanCevaplari.service';
import {KullaniciCevaplari} from '../models/kullaniciCevaplari.model';
import {KullaniciCevaplariService} from '../services/kullaniciCevaplari.service';
import {BankaCalisanlari} from '../models/bankaCalisanlari.model';
import {BankaCalisanlariService} from '../services/bankaCalisanlari.service';

@Component({
  selector: 'app-detailcomplaint',
  templateUrl: './detailcomplaint.component.html',
  styleUrls: ['./detailcomplaint.component.css']
})
export class DetailcomplaintComponent implements OnInit {

  recentSikayetId: number;
  allCalisanCevaplariList: CalisanCevaplari[];
  allKullaniciCevaplariList: KullaniciCevaplari[];
  bankaCalisanlari: BankaCalisanlari[];
  sikayet: Sikayetler;
  kullanici: Kullanicilar;

  constructor(private route: ActivatedRoute,
              private sikayetlerService: SikayetlerService,
              private bankalarService: BankalarService,
              private kullanicilarService: KullanicilarService,
              private kategorilerService: KategorilerService,
              private calisanCevaplariService: CalisanCevaplariService,
              private kullaniciCevaplariService: KullaniciCevaplariService,
              private bankaCalisanlariService: BankaCalisanlariService) {

  }

  ngOnInit(): void {
    this.recentSikayetId = this.route.snapshot.params.compId;
    this.getSikayet(this.recentSikayetId);
  }

  getBanka(id): void {
    this.bankalarService.getById(id).pipe().subscribe((data: Bankalar) => {
      this.sikayet.bankaId = data;
    });
  }

  getBankaCalisani() {
    this.bankaCalisanlariService.getAll().pipe().subscribe((data: BankaCalisanlari[]) => {
      this.bankaCalisanlari = data;
      this.bankaCalisanlari.forEach(calisan => {
        this.allCalisanCevaplariList.forEach(cevap => {
          if (cevap.bankaCalisanlariId === calisan.id) {
            cevap.bankaCalisanlariId = calisan.adSoyad;
          }
        });
      });
    });
  }

  getBankaCalisanlariCevaplari() {
    this.calisanCevaplariService.getRecentSikayet(this.recentSikayetId).pipe().subscribe((data: CalisanCevaplari[]) => {
      this.allCalisanCevaplariList = data;
      this.getBankaCalisani();
    });
  }

  getKategori(id): void {
    this.kategorilerService.getById(id).pipe().subscribe((data: Kategoriler) => {
      this.sikayet.sikayetKategorisi = data.kategoriAdi;
    });
  }

  getKullaniciList(): void {
    this.kullanicilarService.getAll().pipe().subscribe((data: Kullanicilar[]) => {
      data.forEach(kullanici => {
        this.allKullaniciCevaplariList.forEach(kullaniciCevap => {
          if (kullanici.id === kullaniciCevap.kullanici) {
            kullaniciCevap.kullanici = kullanici.adSoyad;
          }
        });
      });
    });
  }

  getKullanici(id): void {
    this.kullanicilarService.getById(id).pipe().subscribe((data: Kullanicilar) => {
      this.kullanici = data;
      this.sikayet.kullanici = this.kullanici.adSoyad;
    });
  }

  getKullaniciCevaplari() {
    this.kullaniciCevaplariService.getRecentSikayet(this.recentSikayetId).pipe().subscribe((data: KullaniciCevaplari[]) => {
      this.allKullaniciCevaplariList = data;
      this.getKullaniciList();
    });
  }

  getSikayet(id): void {
    this.sikayetlerService.getById(id).pipe().subscribe((data: Sikayetler) => {
      this.sikayet = data;
      this.getBanka(this.sikayet.bankaId);
      this.getKullanici(this.sikayet.kullanici);
      this.getKategori(this.sikayet.sikayetKategorisi);
      this.getBankaCalisanlariCevaplari();
      this.getKullaniciCevaplari();
    });
  }
}
