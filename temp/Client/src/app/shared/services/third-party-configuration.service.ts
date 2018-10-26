import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThirdPartyConfigurationService {
  apiUrl = '/v1/thirdpartyconfiguration';

  constructor(private _http: HttpClient) {}

  public get(userId: any): Observable<any> {
    return this._http
      .get(`${this.apiUrl}/status/${userId}`)
      .map((res: any) => res.result);
  }
}
