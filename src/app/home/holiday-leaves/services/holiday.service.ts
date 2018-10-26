import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Holiday } from '../models/holiday.interface';

@Injectable()
export class HolidayService {
  constructor(private _http: HttpClient) {}

  public getYearList(regionId?: string): Observable<Array<any>> {
    let params = new HttpParams().set('regionId', regionId);
    return this._http
      .get('/v1/holidays/yearlist', { params: params })
      .map((res: any) => res);
  }

  public getHolidays(year: string, regionId?: string): Observable<Array<any>> {
    let params = new HttpParams().set('year', year).set('regionId', regionId);
    return this._http
      .get('/v1/holidays/list', { params: params })
      .map((res: any) => res);
  }
}
