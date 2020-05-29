import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {CalisanCevaplari} from '../models/calisanCevaplari.model';

@Injectable({
  providedIn: 'root'
})
export class CalisanCevaplariService extends BaseService {
  getEntityName(): string {
    return 'bankaCalisanlariCevaplari';
  }

  add(calisanCevaplari: CalisanCevaplari) {
    return this.getHttp().post<CalisanCevaplari>(this.getBaseUrl() + this.getEntityName() + '/add', calisanCevaplari);
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
