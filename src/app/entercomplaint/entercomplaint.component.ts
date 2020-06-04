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
  selectedBankId: any;
  selectedKategoriId: any;
  errorMsg = '';

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

  filterBank(filterVal: any) {
    this.selectedBankId = filterVal;
    console.log(this.selectedBankId);
    console.log(typeof (this.selectedBankId));
  }

  filterKategori(filterVal: any) {
    this.selectedKategoriId = filterVal;
    console.log(this.selectedKategoriId);
    console.log(typeof (this.selectedKategoriId));
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
    if ((this.baslik != undefined && this.baslik != '') && (this.telNo != undefined && this.telNo != '' && this.telNo.length === 10) && (this.detay != undefined && this.detay != '') && (this.selectedBankId != 'Şikayet edeceğiniz bankayı giriniz.' && this.selectedBankId != '0') && (this.selectedKategoriId != 'Şikayet kategorisini seçiniz.' && this.selectedKategoriId != '0')) {
      const sikayet = new Sikayetler(null, Number(this.selectedBankId), this.baslik, this.telNo, this.detay, Number(this.selectedKategoriId), null, false, true, id);
      this.sikayetlerService.add(sikayet).pipe().subscribe((data) => {
        this.updateBank();
        this.router.navigate(['/sikayetler']);
      });
    } else {
      this.errorMsg = 'Şikayetinizi paylaşmak için yukarıdaki alanların tamamını uygun bir şekilde doldurmalısınız.';
      this.ngOnInit();
    }
  }

  updateBank() {
    this.bankalarService.getById(Number(this.selectedBankId)).pipe().subscribe((data) => {
      const tempBank = data;
      tempBank.mevcutSikayet = data.mevcutSikayet + 1;
      this.bankalarService.update(tempBank).pipe().subscribe((update) => {
      });
    });
  }
}
