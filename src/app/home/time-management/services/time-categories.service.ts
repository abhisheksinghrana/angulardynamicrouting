import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { TimeCategory } from '../models/time-category.interface';

@Injectable()
export class TimeCategoriesService {
  constructor(private _http: HttpClient) {}

  public list(regionId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('regionId', regionId);
    return this._http
      .get('/v1/time/category/list', { params: params })
      .map((res: any) => res.result);
  }

  public add(category: TimeCategory): Observable<any> {
    return this._http
      .post('/v1/time/category/add', category)
      .map((res: any) => res.result);
  }

  public update(category: TimeCategory): Observable<any> {
    return this._http
      .post('/v1/time/category/update', category)
      .map((res: any) => res.result);
  }

  public delete(id): Observable<any> {
    return this._http
      .delete(`/v1/time/category/delete/${id}`)
      .map((res: any) => res.result);
  }
}
