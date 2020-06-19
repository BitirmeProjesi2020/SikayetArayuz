import {Component, OnInit} from '@angular/core';
import {Kullanicilar} from '../models/kullanicilar.model';
import {KullanicilarService} from '../services/kullanicilar.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signupcustomer',
  templateUrl: './signupcustomer.component.html',
  styleUrls: ['./signupcustomer.component.css']
})
export class SignupcustomerComponent implements OnInit {
  alertText: string = '';
  email: string;
  kullanici: Kullanicilar;
  password: string;
  passwordTkr: string;
  username: string;

  constructor(private kullanicilarService: KullanicilarService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  signUpBtn() {
    if (this.username !== undefined && this.username !== '' && this.email !== undefined && this.email !== '' && this.password !== undefined && this.password !== '') {
      if (this.password !== this.passwordTkr) {
        this.alertText = 'Şifrenizi kontrol edip tekrar deneyin!';
      } else {
        this.kullanici = new Kullanicilar(null, this.username, this.email, this.password);
        this.kullanicilarService.add(this.kullanici).pipe().subscribe((data) => {
          this.alertText = 'Kayıt işlemi başarılı.';
          this.router.navigate(['']);
        });
      }
    } else {
      this.alertText = 'Tüm alanları doldurunuz!';
    }
  }
}
