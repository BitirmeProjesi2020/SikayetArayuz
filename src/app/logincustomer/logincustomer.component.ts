import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Kullanicilar} from '../models/kullanicilar.model';
import {KullanicilarService} from '../services/kullanicilar.service';
import {Router} from '@angular/router';
import {BankaCalisanlari} from '../models/bankaCalisanlari.model';
import {BankaCalisanlariService} from '../services/bankaCalisanlari.service';

@Component({
  selector: 'app-logincustomer',
  templateUrl: './logincustomer.component.html',
  styleUrls: ['./logincustomer.component.css']
})
export class LogincustomerComponent implements OnInit {

  alertText: string = '';
  email: string;
  flag: boolean = false;
  password: string;
  kullanicilarList: Kullanicilar[];
  bankaCalisanlariList: BankaCalisanlari[];

  constructor(private cookieService: CookieService,
              private kullanicilarService: KullanicilarService,
              private bankaCalisanlariService: BankaCalisanlariService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getKullanicilar();
    this.getBankaCalisanlari();
  }

  alertMsg(msg: string) {
    this.alertText = msg;
  }

  getBankaCalisanlari() {
    this.bankaCalisanlariService.getAll().pipe().subscribe((data: BankaCalisanlari[]) => {
      this.bankaCalisanlariList = data;
    });
  }

  getKullanicilar() {
    this.kullanicilarService.getAll().pipe().subscribe((data: Kullanicilar[]) => {
      this.kullanicilarList = data;
      console.log(this.kullanicilarList);
    });
  }

  logInBtn() {
    this.flag = false;
    if (this.email != undefined && this.password != undefined) {
      this.kullanicilarList.forEach(kullanici => {
        if (this.email === kullanici.email && this.password == kullanici.password) {
          this.cookieService.set('uyeId', kullanici.id.toString());
          this.cookieService.set('uyeTipi', 'musteri');
          this.flag = true;
          this.router.navigate(['']);
        }
      });
      this.bankaCalisanlariList.forEach(calisan => {
        if (this.email === calisan.email && this.password == calisan.password) {
          this.cookieService.set('uyeId', calisan.id.toString());
          this.cookieService.set('uyeTipi', 'calisan');
          this.flag = true;
          this.router.navigate(['']);
        }
      });
      if (!this.flag) {
        this.alertMsg('E-mail veya şifreyi yanlış girdiniz. Tekrar deneyiniz.');
      }
    } else {
      this.alertMsg('E-maail ve şifre alanlarını doldurunuz.');
    }
  }

}
