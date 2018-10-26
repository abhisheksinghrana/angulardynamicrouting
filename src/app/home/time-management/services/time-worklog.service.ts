import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TimeWorklogService {
  constructor(private _http: HttpClient) {}

  public update(loggingWork) {
    return this._http
      .post('/v1/time/worklog', loggingWork)
      .map((res: any) => res.result);
  }

  public get(regionId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('regionId', regionId);

    return this._http
      .get('v1/time/worklog', { params: params })
      .map((res: any) => res.result);
  }
}
