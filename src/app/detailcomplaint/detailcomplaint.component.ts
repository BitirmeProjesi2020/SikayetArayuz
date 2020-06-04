import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SikayetlerService} from '../services/sikayetler.service';
import {Sikayetler} from '../models/sikayetler.model';
import {BankalarService} from '../services/bankalar.service';
import {Bankalar} from '../models/bankalar.model';
import {Kullanicilar} from '../models/kullanicilar.model';
import {KullanicilarService} from '../services/kullanicilar.service';
import {Kategoriler} from '../models/kategoriler.model';
import {KategorilerService} from '../services/kategoriler.service';
import {CalisanCevaplari} from '../models/calisanCevaplari.model';
import {CalisanCevaplariService} from '../services/calisanCevaplari.service';
import {KullaniciCevaplari} from '../models/kullaniciCevaplari.model';
import {KullaniciCevaplariService} from '../services/kullaniciCevaplari.service';
import {BankaCalisanlari} from '../models/bankaCalisanlari.model';
import {BankaCalisanlariService} from '../services/bankaCalisanlari.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-detailcomplaint',
  templateUrl: './detailcomplaint.component.html',
  styleUrls: ['./detailcomplaint.component.css']
})
export class DetailcomplaintComponent implements OnInit {

  recentSikayetId: number;
  allCalisanCevaplariList: CalisanCevaplari[];
  allKullaniciCevaplariList: KullaniciCevaplari[];
  bankaCalisanlariList: BankaCalisanlari[];
  cozulduBox: boolean = false;
  sikayet: Sikayetler;
  kullanici: Kullanicilar;
  sikayetTarihList = [];
  txtYorum: string;
  sikayetCozuldu: boolean;


  constructor(private route: ActivatedRoute,
              private sikayetlerService: SikayetlerService,
              private bankalarService: BankalarService,
              private kullanicilarService: KullanicilarService,
              private kategorilerService: KategorilerService,
              private calisanCevaplariService: CalisanCevaplariService,
              private kullaniciCevaplariService: KullaniciCevaplariService,
              private bankaCalisanlariService: BankaCalisanlariService,
              private cookieService: CookieService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.recentSikayetId = this.route.snapshot.params.compId;
    this.getSikayet(this.recentSikayetId);
  }

  addAllCevap(tarih: number) {
    this.sikayetTarihList.push(tarih);
  }

  controlCozulduBox(kullaniciId){
    const id = Number(this.cookieService.get('uyeId'));
    const uyeTipi = this.cookieService.get('uyeTipi');
    if(uyeTipi === 'musteri' && id === kullaniciId && this.sikayet.solved === false){
      this.cozulduBox = true;
    }
    else{
      this.cozulduBox = false;
    }
  }

  getBanka(id): void {
    this.bankalarService.getById(id).pipe().subscribe((data: Bankalar) => {
      this.sikayet.bankaId = data;
    });
  }

  getBankaCalisani() {
    this.bankaCalisanlariService.getAll().pipe().subscribe((data: BankaCalisanlari[]) => {
      this.bankaCalisanlariList = data;
      this.bankaCalisanlariList.forEach(calisan => {
        this.allCalisanCevaplariList.forEach(cevap => {
          if (cevap.bankaCalisanlariId === calisan.id) {
            cevap.bankaCalisanlariId = calisan.adSoyad;
          }
        });
      });
    });
  }

  getBankaCalisanlariCevaplari() {
    this.calisanCevaplariService.getRecentSikayet(this.recentSikayetId).pipe().subscribe((data: CalisanCevaplari[]) => {
      this.allCalisanCevaplariList = data;
      this.getBankaCalisani();

      this.allCalisanCevaplariList.forEach(calisanCevabi => {
        this.addAllCevap(calisanCevabi.cevapTarihi);
      });
    });
  }

  getCevapList(): number[] {
    return this.sikayetTarihList.sort();
  }

  getKategori(id): void {
    this.kategorilerService.getById(id).pipe().subscribe((data: Kategoriler) => {
      this.sikayet.sikayetKategorisi = data.kategoriAdi;
    });
  }

  getKullaniciList(): void {
    this.kullanicilarService.getAll().pipe().subscribe((data: Kullanicilar[]) => {
      data.forEach(kullanici => {
        this.allKullaniciCevaplariList.forEach(kullaniciCevap => {
          if (kullanici.id === kullaniciCevap.kullanici) {
            kullaniciCevap.kullanici = kullanici.adSoyad;
          }
        });
      });
    });
  }

  getKullanici(id): void {
    this.kullanicilarService.getById(id).pipe().subscribe((data: Kullanicilar) => {
      this.kullanici = data;
      this.sikayet.kullanici = this.kullanici.adSoyad;
      this.controlCozulduBox(this.kullanici.id);
    });
  }

  getKullaniciCevaplari() {
    this.kullaniciCevaplariService.getRecentSikayet(this.recentSikayetId).pipe().subscribe((data: KullaniciCevaplari[]) => {
      this.allKullaniciCevaplariList = data;
      this.getKullaniciList();

      this.allKullaniciCevaplariList.forEach(kullaniciCevabi => {
        this.addAllCevap(kullaniciCevabi.cevapTarihi);
      });
    });
  }

  getSikayet(id): void {
    this.sikayetlerService.getById(id).pipe().subscribe((data: Sikayetler) => {
      this.sikayet = data;
      this.getBanka(this.sikayet.bankaId);
      this.getKullanici(this.sikayet.kullanici);
      this.getKategori(this.sikayet.sikayetKategorisi);
      this.getBankaCalisanlariCevaplari();
      this.getKullaniciCevaplari();
    });
  }

  kaydetCozuldu() {
    if (this.sikayetCozuldu === true) {
      // geçerli id'deki sikayet getirliyor
      this.sikayetlerService.getById(this.recentSikayetId).pipe().subscribe((sikayet) => {
        // sikayet parametresi güncelleniyor
        sikayet.solved = this.sikayetCozuldu;
        sikayet.sikayetTarihi = null;
        // Parametre  sikayetler tablosunda veri güncelleniyor.
        this.sikayetlerService.update(sikayet).pipe().subscribe((data) => {
          const bank: Bankalar = this.sikayet.bankaId;
          bank.cozulenSikayet = this.sikayet.bankaId.cozulenSikayet + 1;
          // Bankalar tablosu da güncelleniyor
          this.bankalarService.update(bank).pipe().subscribe((value) => {
            this.router.navigate(['/sikayetler']);
          });
        });
      });
    }
  }

  temizle() {
    this.allCalisanCevaplariList = [];
    this.allKullaniciCevaplariList = [];
    this.bankaCalisanlariList = [];
    this.sikayetTarihList = [];
    this.sikayet = null;
    this.kullanici = null;
    this.txtYorum = null;
  }

  yorumYap() {
    const id = this.cookieService.get('uyeId');
    const uyeTipi = this.cookieService.get('uyeTipi');
    if (this.txtYorum && this.txtYorum !== '') {
      if (uyeTipi === 'musteri') {
        const kullaniciCevaplari = new KullaniciCevaplari(null, id, this.recentSikayetId, this.txtYorum);
        this.kullaniciCevaplariService.add(kullaniciCevaplari).subscribe((data) => {
          this.temizle();
          this.ngOnInit();
        });
      } else if (uyeTipi === 'calisan') {
        const calisanCevaplari = new CalisanCevaplari(null, id, this.recentSikayetId, this.txtYorum);
        this.calisanCevaplariService.add(calisanCevaplari).pipe().subscribe((data) => {
          this.temizle();
          this.ngOnInit();
        });
      }
    }
  }

  filterCozuldu($event) {
    this.sikayetCozuldu = $event.target.checked;
  }
}
