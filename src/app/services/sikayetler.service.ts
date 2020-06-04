import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Sikayetler} from '../models/sikayetler.model';

@Injectable({
  providedIn: 'root'
})
export class SikayetlerService extends BaseService {
  getEntityName(): string {
    return 'sikayetler';
  }

  add(sikayetler: Sikayetler) {
    return this.getHttp().post<Sikayetler>(this.getBaseUrl() + this.getEntityName() + '/add', sikayetler);
  }

  delete(id: number) {
    return this.getHttp().get(this.getBaseUrl() + this.getEntityName() + '/delete?id=' + id);
  }

  getAll() {
    return this.getHttp().get(this.getBaseUrl() + this.getEntityName() + '/getAll', {withCredentials: true});
  }

  getById(id: number) {
    return this.getHttp().get<Sikayetler>(this.getBaseUrl() + this.getEntityName() + '/getById?id=' + id, {withCredentials: true});
  }

  update(sikayetler: Sikayetler) {
    return this.getHttp().post<Sikayetler>(this.getBaseUrl() + this.getEntityName() + '/update', sikayetler);
  }
}
