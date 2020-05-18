import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Complaint } from './Complaint';

@Component({
  selector: 'app-listcomplaints',
  templateUrl: './listcomplaints.component.html',
  styleUrls: ['./listcomplaints.component.css']
})
export class ListcomplaintsComponent implements OnInit {

  constructor(private router: Router) { }

  complaints: Complaint[] = [];

  ngOnInit(): void {

    this.complaints = [
      {id:1, title:'Onaylanan Kredimi Kullanamıyorum !', bankName:'A Bankası',customerName:'Ercan Özkan',date:new  Date ("2020,05,18"),
      compText:'Örnek metin aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa         aaaaaaaaaaaaaaaaaaaa           aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n        aaaaaaaaaaaaaaaaaaaaaa     aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaa Devamınıoku...'},
      
      {id:2, title:'Onaylanan Kredimi Kullanamıyorum !', bankName:'A Bankası',customerName:'Ercan Özkan',date:new  Date ("2020,05,19"),
      compText:'Örnek metin aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa         aaaaaaaaaaaaaaaaaaaa           aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n        aaaaaaaaaaaaaaaaaaaaaa     aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaa Devamınıoku...'},
      
      {id:3, title:'Onaylanan Kredimi Kullanamıyorum !', bankName:'A Bankası',customerName:'Ercan Özkan',date:new  Date ("2020,05,20"),
      compText:'Örnek metin aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa         aaaaaaaaaaaaaaaaaaaa           aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n        aaaaaaaaaaaaaaaaaaaaaa     aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaa Devamınıoku...'},
      
      {id:4, title:'Onaylanan Kredimi Kullanamıyorum !', bankName:'A Bankası',customerName:'Ercan Özkan',date:new  Date ("2020,05,21"),
      compText:'Örnek metin aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa         aaaaaaaaaaaaaaaaaaaa           aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n        aaaaaaaaaaaaaaaaaaaaaa     aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaa Devamınıoku...'},
      
      {id:5, title:'Onaylanan Kredimi Kullanamıyorum !', bankName:'A Bankası',customerName:'Ercan Özkan',date:new  Date ("2020,05,22"),
      compText:'Örnek metin aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa         aaaaaaaaaaaaaaaaaaaa           aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n        aaaaaaaaaaaaaaaaaaaaaa     aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaa aaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaa Devamınıoku...'}
    ];

  }

  clickEnterComp() {
    this.router.navigate(['/yeni-sikayet']);
  }

  ShowDetailComp(compId:number) {
    this.router.navigate(['/sikayet-detay/'+compId]);
  }

}
