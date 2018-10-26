import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TimesheetService {
  apiUrl = '/v1/timesheet';

  constructor(private _http: HttpClient) {}

  public getTimesheet(
    startDate: string,
    endDate: string,
    regionId?: string,
    userId?: string
  ): Observable<any> {
    let queryUrl = '';
    if (startDate && endDate) {
      queryUrl = '/' + startDate + '/' + endDate;
    }
    let params = new HttpParams();
    if (startDate && endDate) {
      params = params.append('regionId', regionId);
    }
    if (userId) {
      params = params.append('userId', userId);
    }

    return this._http
      .get(this.apiUrl + queryUrl, { params: params })
      .map((res: any) => res.result);
  }

  public saveTimesheet(params): Observable<any> {
    return this._http
      .post(`${this.apiUrl}/save`, params)
      .map((res: any) => res.result);
  }

  public manageTimesheet(params): Observable<any> {
    return this._http
      .post(`${this.apiUrl}/manage`, params)
      .map((res: any) => res.result);
  }
}
