import {Component, OnInit} from '@angular/core';
import {Bankalar} from '../models/bankalar.model';
import {BankalarService} from '../services/bankalar.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Sikayetler} from '../models/sikayetler.model';
import {SikayetlerService} from '../services/sikayetler.service';
import {KategorilerService} from '../services/kategoriler.service';
import {Kategoriler} from '../models/kategoriler.model';
import {Deeplearning} from '../models/deeplearning.model';
import {DeeplearningService} from '../services/deeplearning.service';

@Component({
  selector: 'app-entercomplaint',
  templateUrl: './entercomplaint.component.html',
  styleUrls: ['./entercomplaint.component.css']
})
export class EntercomplaintComponent implements OnInit {

  bankalarList: Bankalar[];
  kategorilerList: Kategoriler[];
  baslik: string;
  detay: string;
  musteri: boolean = false;
  telNo: string;
  deeplearning: Deeplearning;
  selectedBank: any;

  constructor(private bankalarService: BankalarService,
              private cookieService: CookieService,
              private sikayetlerService: SikayetlerService,
              private kategorilerService: KategorilerService,
              private deeplearningService: DeeplearningService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.controlMusteri();
    this.getBankalar();
    this.getKategoriler();
  }

  controlMusteri() {
    if (this.cookieService.get('uyeTipi') === 'musteri') {
      this.musteri = true;
    } else {
      this.musteri = false;
    }
  }

  getBankalar(): void {
    this.bankalarService.getAll().pipe().subscribe((data: Bankalar[]) => {
      this.bankalarList = data;
    });
  }

  getKategoriler(): void {
    this.kategorilerService.getAll().pipe().subscribe((data: Kategoriler[]) => {
      this.kategorilerList = data;
    });
  }

  kategoriOner(): void {
    this.deeplearning = new Deeplearning(this.detay);
    this.deeplearningService.getKategori(this.deeplearning).pipe().subscribe((data: Deeplearning) => {
      this.deeplearning = data;
    });
  }

  sendComp() {
    const id = Number(this.cookieService.get('uyeId'));
    if (this.musteri) {
      const sikayet = new Sikayetler(1, this.baslik, this.telNo, this.detay, 1, false, true, id);
      this.sikayetlerService.add(sikayet).pipe().subscribe((data) => {
        this.router.navigate(['/sikayetler']);
      });
    } else {
      this.ngOnInit();
    }
  }
}
