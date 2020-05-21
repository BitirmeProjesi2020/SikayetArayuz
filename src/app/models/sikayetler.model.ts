export class SikayetlerModel {
  id: number;
  bankaId; // TODO: bankalar
  sikayetBasligi: string;
  sikayetTelefonNo: string;
  sikayetIcerigi: string;
  sikayetKategorisi; //BankaKategorileri
  sikayetTarihi: number;
  isSolved: Boolean;
  isShowName: Boolean;
  kullanici; //Kullanicilar
  kullaniciCevaplariList: any[]; //KullaniciCevaplari
  bankaCalisanlariCevaplariList: any[]; //BankaCalisanlariCevaplari
}
