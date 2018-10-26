import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountRegionSettingService {
  constructor(private _http: HttpClient) {}

  public get(regionId?: any, userId?: any) {
    let params = new HttpParams();
    if (userId) {
      params = params.append('userId', userId);
    }

    let queryUrl = '';
    queryUrl += regionId ? `/${regionId}` : '';

    return this._http
      .get(`/v1/account-region/setting${queryUrl}`, { params: params })
      .map((res: any) => res.result);
  }

  public update(params: any): Observable<any> {
    return this._http
      .post('/v1/account-region/setting', params)
      .map((res: any) => res.result);
  }
}
