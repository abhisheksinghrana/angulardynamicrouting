import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeTimesheetService {
  apiUrl = 'v1/reports/timesheet';

  constructor(private _http: HttpClient) {}

  public getUserTimesheet(params: any): Observable<any> {
    return this._http
      .get(`${this.apiUrl}/employee`, { params: params })
      .map((res: any) => res.result);
  }

  public getTimesheetReport(params: any) {
    let queryParams = new HttpParams();
    for (const key in params) {
      queryParams = queryParams.set(key, params[key]);
    }
    window.open(
      'v1/pdfreport/employee/weekly?' + queryParams.toString(),
      '_blank'
    );
  }
}
