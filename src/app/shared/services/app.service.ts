import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  constructor(private _http: HttpClient) {}

  getEnvironmentConfig(): Observable<any> {
    return this._http
      .get('/config/environment.config.json')
      .map((res: any) => res || {});
  }

  getFeatureToggleConfig(): Observable<any> {
    return this._http
      .get('/resources/feature-toggle/feature-toggle.json')
      .map((res: any) => res || {});
  }
}
