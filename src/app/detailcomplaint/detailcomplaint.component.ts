import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SikayetlerService} from '../services/sikayetler.service';
import {Sikayetler} from '../models/sikayetler.model';
import {BankalarService} from '../services/bankalar.service';
import {Bankalar} from '../models/bankalar.model';
import {Kullanicilar} from '../models/kullanicilar.model';
import {KullanicilarService} from '../services/kullanicilar.service';

@Component({
  selector: 'app-detailcomplaint',
  templateUrl: './detailcomplaint.component.html',
  styleUrls: ['./detailcomplaint.component.css']
})
export class DetailcomplaintComponent implements OnInit {

  banka: Bankalar;
  sikayet: Sikayetler;
  kullanici: Kullanicilar;

  constructor(private route: ActivatedRoute,
              private sikayetlerService: SikayetlerService,
              private bankalarService: BankalarService,
              private kullanicilarService: KullanicilarService) {
  
   }

  ngOnInit(): void {
    let id = this.route.snapshot.params.compId;
    this.getSikayet(id);
    //this.getBanka(this.sikayet.bankaId);
    //this.getKullanici(this.sikayet.kullanici);
  }

  getBanka(id): void{
    this.bankalarService.getById(id).pipe().subscribe((data: Bankalar) => {
      this.banka = data;
      console.log(this.banka)
      console.log(typeof(id))
      this.sikayet.bankaId = this.banka.ad;
    });
  }

  getCevaplar(compid){
    
  }

  getKullanici(id): void{
    this.kullanicilarService.getById(id).pipe().subscribe((data: Kullanicilar) => {
      this.kullanici = data;
      console.log(this.kullanici)
      this.sikayet.kullanici = this.kullanici.adSoyad;
    });
  }

  getSikayet(id): void{
    this.sikayetlerService.getById(id).pipe().subscribe((data: Sikayetler) => {
      this.sikayet = data;
      this.getBanka(this.sikayet.bankaId);
      this.getKullanici(this.sikayet.kullanici);
    });
  }

  yorumYap(){
    //Yorum yap yazısına tıklanıldığında yapılacaklar.
  }
  
}