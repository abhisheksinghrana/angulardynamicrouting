import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WorklogService {
  apiUrl = '/v1/worklog';

  constructor(private _http: HttpClient) {}

  public delete(params): Observable<any> {
    return this._http
      .post(`${this.apiUrl}/delete/${params.workLogId}`, null)
      .map((res: any) => res.result);
  }

  public manageDelete(params): Observable<any> {
    return this._http
      .post(`${this.apiUrl}/manage/delete/${params.workLogId}`, null)
      .map((res: any) => res.result);
  }

  public updateDescription(params: any): Observable<any> {
    return this._http
      .post(`${this.apiUrl}/description`, params)
      .map((res: any) => res.result);
  }
}
