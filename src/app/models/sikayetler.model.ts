export class Sikayetler {
  id: number;
  bankaId;
  sikayetBasligi: string;
  sikayetTelefonNo: string;
  sikayetIcerigi: string;
  sikayetKategorisi;
  sikayetTarihi: Date;
  solved: boolean;
  showName: boolean;
  kullanici;

  constructor(id: number, bankaId, sikayetBasligi: string, sikayetTelefonNo: string, sikayetIcerigi: string, sikayetKategorisi, sikayetTarihi: Date, solved: boolean, showName: boolean, kullanici) {
    this.id = id;
    this.bankaId = bankaId;
    this.sikayetBasligi = sikayetBasligi;
    this.sikayetTelefonNo = sikayetTelefonNo;
    this.sikayetIcerigi = sikayetIcerigi;
    this.sikayetKategorisi = sikayetKategorisi;
    this.sikayetTarihi = sikayetTarihi;
    this.solved = solved;
    this.showName = showName;
    this.kullanici = kullanici;
  }
}
