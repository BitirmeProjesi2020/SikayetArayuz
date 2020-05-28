import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SikayetlerService } from '../services/sikayetler.service';
import { Sikayetler } from '../models/sikayetler.model';
import { BankalarService } from '../services/bankalar.service';
import { Bankalar } from '../models/bankalar.model';
import { Kullanicilar } from '../models/kullanicilar.model';
import { KullanicilarService } from '../services/kullanicilar.service';
import { Kategoriler } from '../models/kategoriler.model';
import { KategorilerService } from '../services/kategoriler.service';
import { CalisanCevaplari } from '../models/calisanCevaplari.model';
import { CalisanCevaplariService } from '../services/calisanCevaplari.service';
import { KullaniciCevaplari } from '../models/kullaniciCevaplari.model';
import { KullaniciCevaplariService } from '../services/kullaniciCevaplari.service';
import { BankaCalisanlari } from '../models/bankaCalisanlari.model';
import { BankaCalisanlariService } from '../services/bankaCalisanlari.service';

@Component({
  selector: 'app-detailcomplaint',
  templateUrl: './detailcomplaint.component.html',
  styleUrls: ['./detailcomplaint.component.css']
})
export class DetailcomplaintComponent implements OnInit {

  allCalisanCevaplariList: CalisanCevaplari[];
  allKullaniciCevaplariList: KullaniciCevaplari[];
  banka: Bankalar;
  bankaCalisanlari: BankaCalisanlari[];
  sikayet: Sikayetler;
  kategori: Kategoriler;
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
    let id = this.route.snapshot.params.compId;
    this.getSikayet(id);
  }

  getBanka(id): void {
    this.bankalarService.getById(id).pipe().subscribe((data: Bankalar) => {
      this.banka = data;
      this.sikayet.bankaId = this.banka.ad;
    });
  }

  getBankaCalisani() {
    this.bankaCalisanlariService.getAll().pipe().subscribe((data: BankaCalisanlari[]) => {
      this.bankaCalisanlari = data;
      console.log(this.bankaCalisanlari)
    });
  }

  getBankaCalisanlariCevaplari() {
    this.calisanCevaplariService.getAll().pipe().subscribe((data: CalisanCevaplari[]) => {
      this.allCalisanCevaplariList = data;
    });

    this.allCalisanCevaplariList.forEach(calisanCevap => {
      if (calisanCevap.sikayetlerId === this.sikayet.id) {
        this.bankaCalisanlari.forEach(bankaCalisani =>{
          if(Number(calisanCevap.bankaCalisanlariId) === bankaCalisani.id){
            calisanCevap.bankaCalisanlariId = bankaCalisani.adSoyad;
          }
        });
       
      }
      else {
        this.allCalisanCevaplariList.splice(this.allCalisanCevaplariList.indexOf(calisanCevap), 1);
      }
    });
    //console.log(this.allCalisanCevaplariList);
  }

  getKategori(id): void {
    this.kategorilerService.getById(id).pipe().subscribe((data: Kategoriler) => {
      this.kategori = data;
    });
  }

  getKullanici(id): void {
    this.kullanicilarService.getById(id).pipe().subscribe((data: Kullanicilar) => {
      this.kullanici = data;
      this.sikayet.kullanici = this.kullanici.adSoyad;
    });
  }

  getKullaniciCevaplari() {
    this.kullaniciCevaplariService.getAll().pipe().subscribe((data: KullaniciCevaplari[]) => {
      this.allKullaniciCevaplariList = data;
      this.allKullaniciCevaplariList.forEach(kullaniciCevap => {
        //console.log(kullaniciCevap.sikayetlerId)
        //console.log(this.sikayet.id)
        if (kullaniciCevap.sikayetlerId === this.sikayet.id) {

        }
        else {
          this.allKullaniciCevaplariList.splice(this.allKullaniciCevaplariList.indexOf(kullaniciCevap), 1);
        }
      });
      //console.log(this.allKullaniciCevaplariList);
    });
  }

  getSikayet(id): void {
    this.sikayetlerService.getById(id).pipe().subscribe((data: Sikayetler) => {
      this.sikayet = data;
      this.getBankaCalisani()
      this.getBanka(this.sikayet.bankaId);
      this.getKullanici(this.sikayet.kullanici);
      this.getBankaCalisanlariCevaplari();
      this.getKullaniciCevaplari();
      this.getKategori(this.sikayet.sikayetKategorisi);
    });
  }

  yorumYap() {
    //Yorum yap yazısına tıklanıldığında yapılacaklar.
  }

}