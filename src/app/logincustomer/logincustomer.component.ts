import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Kullanicilar } from '../models/kullanicilar.model';
import { KullanicilarService } from '../services/kullanicilar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logincustomer',
  templateUrl: './logincustomer.component.html',
  styleUrls: ['./logincustomer.component.css']
})
export class LogincustomerComponent implements OnInit {

  alertText: string = "";
  email: string;
  flag: boolean = false;
  password: string;
  kullanicilarList: Kullanicilar[];

  constructor(private cookieService: CookieService,
              private kullanicilarService: KullanicilarService,
              private router: Router) { }

  ngOnInit(): void {
    this.getKullanicilar();
  }

  alertMsg(msg: string) {
    this.alertText = msg;
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
          this.cookieService.set('kullaniciId', kullanici.id.toString());
          this.cookieService.set('kullaniciAdSoyad', kullanici.adSoyad);
          this.cookieService.set('kullaniciEmail', kullanici.email);
          this.cookieService.set('kullaniciPassword', kullanici.password);
          this.flag = true;
          this.alertMsg("Giriş işlemi başarılı.");
          this.router.navigate(['']);
        }
      });
      if (!this.flag) {
        this.alertMsg("E-mail veya şifreyi yanlış girdiniz. Tekrar deneyiniz.");
      }
    }
    else {
      this.alertMsg("E-maail ve şifre alanlarını doldurunuz.");
    }
  }

}
