import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarcustom',
  templateUrl: './navbarcustom.component.html',
  styleUrls: ['./navbarcustom.component.css']
})
export class NavbarcustomComponent implements OnInit {

  kullanici: boolean;
  kullaniciName: string;
  constructor(private cookieService: CookieService,
              private router: Router) { }

  ngOnInit(): void {
    this.controlCookie();
  }

  controlCookie() {
    console.log (this.kullanici);
    if(this.cookieService.get('kullaniciId') === ""){
      this.kullanici = false;
      console.log("Kullanici giriş yapmamış.");
    }
    else{
      this.kullanici = true;
      this.kullaniciName = this.cookieService.get('kullaniciAdSoyad');
      console.log("Kullanici giriş yapmıştır.");
    }
  }

  deleteCookie(){
    this.cookieService.delete('kullaniciId');
    this.cookieService.delete('kullaniciAdSoyad');
    this.cookieService.delete('kullaniciEmail');
    this.cookieService.delete('kullaniciPassword');
    this.ngOnInit();
  }

  logIn() {
    this.router.navigate(['/uye-girisi']);
  }
  
  signUp() {
    this.router.navigate(['/uye-ol']);
  }

}
