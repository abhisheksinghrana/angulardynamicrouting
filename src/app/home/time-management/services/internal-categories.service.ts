import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { InternalCategory } from '../models/internal-category.interface';

@Injectable()
export class InternalCategoriesService {
  constructor(private _http: HttpClient) {}

  public list(regionId: string): Observable<any> {
    return this._http
      .get(`/v1/time/internalcategory/${regionId}`)
      .map((res: any) => res.result);
  }

  public add(category: InternalCategory): Observable<any> {
    return this._http
      .post('/v1/time/internalcategory/add', category)
      .map((res: any) => res.result);
  }

  public update(category: InternalCategory): Observable<any> {
    return this._http
      .post('/v1/time/internalcategory/update', category)
      .map((res: any) => res.result);
  }

  public delete(id): Observable<any> {
    return this._http
      .delete(`/v1/time/internalcategory/${id}`)
      .map((res: any) => res.result);
  }
}
