import { Component, OnInit } from '@angular/core';
import { Kullanicilar } from '../models/kullanicilar.model';
import { KullanicilarService } from '../services/kullanicilar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signupcustomer',
  templateUrl: './signupcustomer.component.html',
  styleUrls: ['./signupcustomer.component.css']
})
export class SignupcustomerComponent implements OnInit {
  alertText: string = "";
  email: string;
  kullanici: Kullanicilar;
  password: string;
  passwordTkr: string;
  username: string;

  constructor(private kullanicilarService: KullanicilarService,
              private router: Router) { }

  ngOnInit(): void {
  }

  signUpBtn() {
    if (this.username == undefined || this.email == undefined || this.password == undefined) {
      this.alertText = "Tüm alanları doldurunuz!";
    }
    else if (this.password != this.passwordTkr) {
      this.alertText = "Şifrenizi kontrol edip tekrar deneyin!";
    }
    else {
      this.kullanici = { id: null, adSoyad: this.username, email: this.email, password: this.password }

      this.kullanicilarService.add(this.kullanici).pipe().subscribe((data) => {
        this.alertText = "Kayıt işlemi başarılı.";
        this.router.navigate(['']);
      });
    }
  }
}
