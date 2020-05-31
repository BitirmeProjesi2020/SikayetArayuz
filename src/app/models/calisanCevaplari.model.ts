export class CalisanCevaplari {
    id: number;
    bankaCalisanlariId;
    sikayetlerId: number;
    mesaj: string;
    cevapTarihi: number;


  constructor(id: number, bankaCalisanlariId, sikayetlerId: number, mesaj: string) {
    this.id = id;
    this.bankaCalisanlariId = bankaCalisanlariId;
    this.sikayetlerId = sikayetlerId;
    this.mesaj = mesaj;
  }
}
