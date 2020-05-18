import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailComp } from './detailComp';
import { Bank } from '../listbanks/bank';
import { Answer } from './answer';


@Component({
  selector: 'app-detailcomplaint',
  templateUrl: './detailcomplaint.component.html',
  styleUrls: ['./detailcomplaint.component.css']
})
export class DetailcomplaintComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    
   }

   complaint:DetailComp;
   bank:Bank;
   answers:Answer[] = [];

  ngOnInit(): void {
    let id = this.route.snapshot.params.compId;
    this.getComp(id);
    this.getBank(this.complaint.bankId);
    this.getAnswers(id);

  }

  getComp(compid){
    //Ayrıntılı sikayet bilgileri cekilecek ve complaint objesine atanacak. compid şikayet id'sini temsil ediyor. 
    //Bu degere göre cekebilirsin.
    this.complaint = {id:Number(compid), title:'Onaylanan Kredimi Kullanamıyorum !', bankId:1,customerName:'Ercan Özkan',date:new  Date ("2020,05,18"),
    detCompText:"Bu olay defalarca kez başıma gelmiştir. En yakın  şubesine gidiniz yazıyor. 3-4 lira için kim şubeye gider? Ama bu olay defalarca olunca tak ediyor. Örtbas edilmeye mi çalışılıyor. Madem ünite bozuk, para yatırma tutarım kadarını yatırsın otomatik olarak. Bugüne kadar olan tüm para üstü aksaklıklarının kendi hesabıma yatırılmasını talep ediyorum.", category:"Bankamatik"};

  }

  getBank(bankid){
    //Banka bilgileri cekilecek ve bank objesine atanacak. bankid banka id'sini temsil ediyor.Bu degere göre cekebilirsin.
    this.bank =  { bankId: bankid, bankName: 'A Bank', bankTotalComp: 1200, bankSolvedComp: 1000, happyRate: 98 };
  }

  getAnswers(compid){
    //sikayetin id degerine göre verilen cevaplar cekilecek. compid degerine sahip cevapları cekebilirsin.
    this.answers=[
      {compId:compid, bankName:"A Bank", message:"Değerli Müşterimiz, sikayetvar.com sitesine ilettiğiniz mesajınız Bankamıza ulaşmış olup, en kısa sürede tarafınıza bilgi verilecektir. Saygılarımızla,",date:new  Date ("2020,05,18")},
      {compId:compid, bankName:"A Bank", message:"Değerli Müşterimiz, sikayetvar.com sitesine ilettiğiniz mesajınız Bankamıza ulaşmış olup, en kısa sürede tarafınıza bilgi verilecektir. Saygılarımızla,",date:new  Date ("2020,05,25")},
    ]
  }


  Comment(){
    //Yorum yap yazısına tıklanıldığında yapılacaklar.
  }
}