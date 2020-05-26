import {Sikayetler} from './sikayetler.model';

export class Bankalar {
  id: number;
  ad: string;
  mevcutSikayet: number;
  cozulenSikayet: number;
  bankaCalisanlariList; // BankaCalisanlari
  sikayetlerList: Sikayetler[];
}
