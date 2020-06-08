import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Deeplearning} from '../models/deeplearning.model';

@Injectable({
  providedIn: 'root'
})
export class DeeplearningService {
  constructor(private http: HttpClient) {
  }

  getBaseUrl(): string {
    let baseUrl = '';
    if (location.href.indexOf('localhost') > -1) {
      baseUrl = 'http://localhost:5000/sikayet';
    } else {
      baseUrl = 'http://ercanozkan.online:5000/sikayet';
    }
    return baseUrl;
  }

  getKategori(deeplearning: Deeplearning) {
    return this.http.post(this.getBaseUrl(), deeplearning);
  }
}
