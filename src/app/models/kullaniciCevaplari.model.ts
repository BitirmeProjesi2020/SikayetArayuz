export class KullaniciCevaplari {
    id: number;
    kullanici;
    sikayetlerId: number;
    mesaj: string;
    cevapTarihi: number;


  constructor(id: number, kullanici, sikayetlerId: number, mesaj: string) {
    this.id = id;
    this.kullanici = kullanici;
    this.sikayetlerId = sikayetlerId;
    this.mesaj = mesaj;
  }
}
