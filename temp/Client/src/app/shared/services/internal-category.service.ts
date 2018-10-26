import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InternalCategoryService {
  apiUrl = '/v1/time/internalcategory';

  constructor(private _http: HttpClient) {}

  public get(regionId?: string, userId?: string): Observable<any> {
    let params = new HttpParams();
    if (regionId) {
      params = params.append('regionId', regionId);
    }
    if (userId) {
      params = params.append('userId', userId);
    }

    return this._http
      .get(`${this.apiUrl}/region`, { params: params })
      .map((res: any) => res.result);
  }
}
