import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {
  constructor(private _http: HttpClient) {}

  public get(regionId?: string, userId?: string): Observable<any> {
    let params = new HttpParams();
    if (userId) {
      params = params.append('userId', userId);
    }

    let queryUrl = '';
    queryUrl += regionId ? `/${regionId}` : '';

    return this._http
      .get(`/v1/category/list${queryUrl}`, { params: params })
      .map((res: any) => res.result);
  }
}
