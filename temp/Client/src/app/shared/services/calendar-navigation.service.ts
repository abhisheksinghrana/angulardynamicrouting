import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CalendarNavigationService {
  constructor(private _http: HttpClient) {}

  public getCalendarNavigationDetails(
    actionType?: number,
    startDate?: string
  ): Observable<any> {
    let params = '';
    if (actionType && startDate) {
      params = '/' + actionType + '/' + startDate;
    }
    return this._http
      .get('/v1/calendar/navigation' + params)
      .map((res: any) => res.result);
  }
}
