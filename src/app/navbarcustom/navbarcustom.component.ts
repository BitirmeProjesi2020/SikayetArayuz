import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarcustom',
  templateUrl: './navbarcustom.component.html',
  styleUrls: ['./navbarcustom.component.css']
})
export class NavbarcustomComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logIn() {
    this.router.navigate(['/uye-girisi']);
  }
  signUp() {
    this.router.navigate(['/uye-ol']);
  }


}
