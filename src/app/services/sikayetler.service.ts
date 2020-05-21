import {Injectable} from '@angular/core';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SikayetlerService extends BaseService {
  getEntityName(): string {
    return 'sikayetler';
  }

  getAll() {
    return this.getHttp().get(this.getBaseUrl() + this.getEntityName() + '/getAll', {withCredentials: true});
  }

  getById(id: number) {
    return this.getHttp().get(this.getBaseUrl() + this.getEntityName() + '/getById?id=' + id, {withCredentials: true});
  }
}
