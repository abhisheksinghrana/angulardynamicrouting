import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GroupByPreferencesService {
  constructor(private _http: HttpClient) {}

  public get(reportType: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('reportType', reportType);

    return this._http
      .get('/v1/reports/groupby/preferences', { params: params })
      .map((res: any) => res.result);
  }

  public list(params: any): Observable<any> {
    return this._http
      .post('/v1/reports/groupby/list', params)
      .map((res: any) => res.result);
  }
}
