import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export abstract class BaseService {
  constructor(private http: HttpClient,
              private router: Router) {
  }

  public href = '';

  public abstract getEntityName();

  getHttp(): HttpClient {
    return this.http;
  }

  getBaseUrl(): string {
    let baseUrl = '';
    if (location.href.indexOf('localhost') > -1) {
      baseUrl = 'http://localhost:8080/';
    } else {
      baseUrl = 'http://ercanozkan.online:8080/';
    }
    return baseUrl;
  }
}
