import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Kategoriler} from '../models/kategoriler.model';

@Injectable({
  providedIn: 'root'
})
export class KategorilerService extends BaseService {
  getEntityName(): string {
    return 'bankaKategorileri';
  }

  add(kategoriler: Kategoriler) {
    return this.getHttp().post<Kategoriler>(this.getBaseUrl() + this.getEntityName() + '/add', kategoriler);
  }

  getAll() {
    return this.getHttp().get<Kategoriler[]>(this.getBaseUrl() + this.getEntityName() + '/getAll', {withCredentials: true});
  }

  getById(id: number) {
    return this.getHttp().get<Kategoriler>(this.getBaseUrl() + this.getEntityName() + '/getById?id=' + id, {withCredentials: true});
  }
}
