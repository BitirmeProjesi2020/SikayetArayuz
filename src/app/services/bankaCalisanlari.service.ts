import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {BankaCalisanlari} from '../models/bankaCalisanlari.model';

@Injectable({
  providedIn: 'root'
})
export class BankaCalisanlariService extends BaseService {
  getEntityName(): string {
    return 'bankaCalisanlari';
  }

  add(bankaCalisanlari: BankaCalisanlari) {
    return this.getHttp().post<BankaCalisanlari>(this.getBaseUrl() + this.getEntityName() + '/add', bankaCalisanlari);
  }

  getAll() {
    return this.getHttp().get(this.getBaseUrl() + this.getEntityName() + '/getAll', {withCredentials: true});
  }

  getById(id: number) {
    return this.getHttp().get(this.getBaseUrl() + this.getEntityName() + '/getById?id=' + id, {withCredentials: true});
  }
}