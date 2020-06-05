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
  selectedBankalar: boolean[] = new Array();
  selectedKategoriler: boolean[] = new Array();
  eslesenBanka: Sikayetler[] = new Array();
  eslesenKategori: Sikayetler[] = new Array();
  eslesenSikayetler: Sikayetler[] = new Array();

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

  filterBank(id){
    this.eslesenBanka.length = 0;
    this.eslesenKategori.length = 0;
    this.eslesenSikayetler.length = 0;
    id = id - 1;
    if(this.selectedBankalar[id] === false || this.selectedBankalar[id] === undefined){
      this.selectedBankalar[id] = true;
    }
    else{
      this.selectedBankalar[id] = false;
    }
    console.log('secilen bankalar: ', this.selectedBankalar);
    console.log('secilen kategoriler: ', this.selectedKategoriler);
    this.getEslesen();
  }

  filterKategori(id){
    this.eslesenKategori.length = 0; 
    id = id - 1;
    if(this.selectedKategoriler[id] === false || this.selectedKategoriler[id] === undefined){
      this.selectedKategoriler[id] = true;
    }
    else{
      this.selectedKategoriler[id] = false;
    }
    console.log('secilen bankalar: ', this.selectedBankalar);
    console.log('secilen kategoriler: ', this.selectedKategoriler);
    this.getEslesen();
  }

  getEslesen(){
    for(let i=0; i< this.sikayetlerList.length ; i++){
      for(let j=0; j< this.selectedBankalar.length ; j++){
        if(this.selectedBankalar[j]===true && this.bankalarList[j].ad === this.sikayetlerList[i].bankaId){
          this.eslesenBanka.push(this.sikayetlerList[i]);
        }
      }
    }
    for(let i=0; i< this.sikayetlerList.length ; i++){
      for(let j=0; j< this.selectedKategoriler.length ; j++){
        if(this.selectedKategoriler[j]===true && this.kategorilerList[j].id === this.sikayetlerList[i].sikayetKategorisi){
          this.eslesenKategori.push(this.sikayetlerList[i]);
        }
      }
    }
    console.log('eslesen bankalar: ',this.eslesenBanka);
    console.log('eslesen kategoriler: ',this.eslesenKategori);
    this.getEslesenSikayetler();
  }

  getEslesenSikayetler(){
    console.log('Eslesen Sikayetler:')
    this.eslesenSikayetler.length = 0;
    console.log('eslesenBankaLength: ', this.eslesenBanka.length);
    console.log('eslesenKategoriLength: ', this.eslesenKategori.length);
    if(this.eslesenBanka.length === 0 && this.eslesenKategori.length != 0){
      this.eslesenSikayetler = this.eslesenKategori;
      console.log('banka bos: ',this.eslesenSikayetler);
      return;
    }
    if(this.eslesenKategori.length === 0 && this.eslesenBanka.length != 0){
      this.eslesenSikayetler = this.eslesenBanka;
      console.log('kategori bos: ',this.eslesenSikayetler);
      return;
    }
    if(this.eslesenBanka.length != 0 && this.eslesenKategori.length != 0){
      console.log('banka-kategori join: ');
      for(let i=0; i< this.eslesenBanka.length ; i++){
        for(let j=0; j< this.eslesenKategori.length ; j++){
          if(this.eslesenBanka[i].id === this.eslesenKategori[j].id){
            this.eslesenSikayetler.push(this.eslesenKategori[i]);
          }
        }
      }
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
