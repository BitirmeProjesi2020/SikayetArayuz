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
  constructor(private cookieService: CookieService,
              private router: Router) { }

  ngOnInit(): void {
    this.controlCookie();
  }

  controlCookie() {
    if(this.cookieService.get('uyeId') === ""){
      this.kullanici = false;
      console.log("Calisan veya Musteri giriş yapmamış.");
    }
    else{
      this.kullanici = true;
      console.log("Calisan veya Musteri giris yapmıştır.");
      console.log(this.cookieService.get('uyeTipi'));
    }
  }

  deleteCookie(){
    this.cookieService.delete('uyeId');
    this.cookieService.delete('uyeTipi');
    this.router.navigate(['']);
  }

  logIn() {
    this.router.navigate(['/uye-girisi']);
  }
  
  signUp() {
    this.router.navigate(['/uye-ol']);
  }

}
