import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Bankalar} from '../models/bankalar.model';

@Injectable({
  providedIn: 'root'
})
export class BankalarService extends BaseService {
  getEntityName(): string {
    return 'bankalar';
  }

  add(bankalar: Bankalar) {
    return this.getHttp().post(this.getBaseUrl() + this.getEntityName() + '/add', JSON.stringify(bankalar), {withCredentials: true});
  }

  getAll() {
    return this.getHttp().get(this.getBaseUrl() + this.getEntityName() + '/getAll', {withCredentials: true});
  }

  getById(id: number) {
    return this.getHttp().get(this.getBaseUrl() + this.getEntityName() + '/getById?id=' + id, {withCredentials: true});
  }
}
