import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-listcomplaints',
  templateUrl: './listcomplaints.component.html',
  styleUrls: ['./listcomplaints.component.css']
})
export class ListcomplaintsComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  clickEnterComp(){
    this.router.navigate(['/yeni-sikayet']);
  }

}
