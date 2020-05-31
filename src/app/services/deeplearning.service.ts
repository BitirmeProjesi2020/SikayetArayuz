import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Deeplearning} from '../models/deeplearning.model';

@Injectable({
  providedIn: 'root'
})
export class DeeplearningService {
  constructor(private http: HttpClient) {
  }

  getKategori(deeplearning: Deeplearning) {
    return this.http.post('http://localhost:5000/sikayet', deeplearning);
  }
}
