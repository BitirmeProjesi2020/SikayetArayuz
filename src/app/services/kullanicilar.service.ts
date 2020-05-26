import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Bankalar} from '../models/bankalar.model';
import {Kullanicilar} from '../models/kullanicilar.model';
import {Sikayetler} from '../models/sikayetler.model';

@Injectable({
  providedIn: 'root'
})
export class KullanicilarService extends BaseService {
  getEntityName(): string {
    return 'kullanicilar';
  }

  add(kullanicilar: Kullanicilar) {
    return this.getHttp().post<Sikayetler>(this.getBaseUrl() + this.getEntityName() + '/add', kullanicilar);
  }

  getAll() {
    return this.getHttp().get(this.getBaseUrl() + this.getEntityName() + '/getAll', {withCredentials: true});
  }

  getById(id: number) {
    return this.getHttp().get(this.getBaseUrl() + this.getEntityName() + '/getById?id=' + id, {withCredentials: true});
  }
}
