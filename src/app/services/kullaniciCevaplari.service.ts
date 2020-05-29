import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {KullaniciCevaplari} from '../models/kullaniciCevaplari.model';

@Injectable({
  providedIn: 'root'
})
export class KullaniciCevaplariService extends BaseService {
  getEntityName(): string {
    return 'kullanicilarCevaplari';
  }

  add(kullaniciCevaplari: KullaniciCevaplari) {
    return this.getHttp().post<KullaniciCevaplari>(this.getBaseUrl() + this.getEntityName() + '/add', kullaniciCevaplari);
  }

  getAll() {
    return this.getHttp().get(this.getBaseUrl() + this.getEntityName() + '/getAll', {withCredentials: true});
  }

  getById(id: number) {
    return this.getHttp().get(this.getBaseUrl() + this.getEntityName() + '/getById?id=' + id, {withCredentials: true});
  }

  getRecentSikayet(sikayetid: number) {
    return this.getHttp().get(this.getBaseUrl() + this.getEntityName() + '/getRecentSikayet?sikayetid=' + sikayetid, {withCredentials: true});
  }
}
