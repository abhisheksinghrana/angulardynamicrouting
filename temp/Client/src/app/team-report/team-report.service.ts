import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TeamReportService {
  constructor(private _http: HttpClient) {}

  public getTeamWorklog(
    teamId: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('teamId', teamId);
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);

    return this._http
      .get('v1/team/report/worklog', { params: params })
      .map((res: any) => res.result);
  }
}
