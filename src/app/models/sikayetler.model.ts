export class Sikayetler {
  id: number;
  bankaId;
  sikayetBasligi: string;
  sikayetTelefonNo: string;
  sikayetIcerigi: string;
  sikayetKategorisi;
  sikayetTarihi: number;
  solved: boolean;
  showName: boolean;
  kullanici;

  constructor(bankaId, sikayetBasligi: string, sikayetTelefonNo: string, sikayetIcerigi: string, sikayetKategorisi: number, solved: boolean, showName: boolean, kullanici: number) {
    this.bankaId = bankaId;
    this.sikayetBasligi = sikayetBasligi;
    this.sikayetTelefonNo = sikayetTelefonNo;
    this.sikayetIcerigi = sikayetIcerigi;
    this.sikayetKategorisi = sikayetKategorisi;
    this.solved = solved;
    this.showName = showName;
    this.kullanici = kullanici;
  }
}
