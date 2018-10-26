import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

@Injectable()
export class AppService {
  env: any;

  constructor(private _http: HttpClient) {
    this.env = environment;
  }

  getEnvironmentConfig(): Observable<any> {
    return this._http
      .get(`${this.env.deployUrl}/config/environment.config.json`)
      .map((res: any) => res || {});
  }

  getFeatureToggleConfig(): Observable<any> {
    return this._http
      .get(`${this.env.deployUrl}/resources/feature-toggle/feature-toggle.json`)
      .map((res: any) => res || {});
  }
}
