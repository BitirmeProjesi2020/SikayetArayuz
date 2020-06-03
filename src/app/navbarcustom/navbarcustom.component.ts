import {BankaCalisanlari} from '../models/bankaCalisanlari.model';
import {BankaCalisanlariService} from '../services/bankaCalisanlari.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Kullanicilar } from '../models/kullanicilar.model';
import { KullanicilarService } from '../services/kullanicilar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarcustom',
  templateUrl: './navbarcustom.component.html',
  styleUrls: ['./navbarcustom.component.css']
})
export class NavbarcustomComponent implements OnInit {

  kullanici: boolean;
  kullaniciName: string;
  constructor( private bankaCalisanlariService:BankaCalisanlariService,
              private cookieService: CookieService,
              private kullanicilarService: KullanicilarService,
              private router: Router) { }

  ngOnInit(): void {
    this.controlCookie();
  }

  controlCookie() {
    if (this.cookieService.get('uyeId') === "") {
      this.kullanici = false;
    }
    else {
      this.kullanici = true;
      if(this.cookieService.get('uyeTipi') === "musteri"){
        this.getMusteriName();
      }
      else{
        this.getCalisanName();
      }
    }
  }

  deleteCookie() {
    this.cookieService.delete('uyeId');
    this.cookieService.delete('uyeTipi');
    this.router.navigate(['']);
    this.ngOnInit();
  }

  logIn() {
    this.router.navigate(['/uye-girisi']);
  }

  signUp() {
    this.router.navigate(['/uye-ol']);
  }

  getMusteriName() {
    this.kullanicilarService.getById(Number(this.cookieService.get('uyeId'))).pipe().subscribe((data: Kullanicilar) => {
      this.kullaniciName = data.adSoyad;
    });
  }

  getCalisanName(){
    this.bankaCalisanlariService.getById(Number(this.cookieService.get('uyeId'))).pipe().subscribe((data: BankaCalisanlari) => {
      this.kullaniciName = data.adSoyad; 
    });
  }

}
