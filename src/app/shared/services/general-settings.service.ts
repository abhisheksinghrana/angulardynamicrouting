import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class GeneralSettingsService {
  constructor(private _http: HttpClient) {}

  public get(regionId): Observable<any> {
    let params = new HttpParams();
    params = params.append('regionId', regionId);

    return this._http
      .get('/v1/GeneralSetting/get', { params: params })
      .map((res: any) => res.result);
  }

  public save(generalSettings): Observable<any> {
    return this._http
      .post('/v1/GeneralSetting/save', generalSettings)
      .map((res: any) => res);
  }
}
