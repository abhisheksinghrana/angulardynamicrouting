import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BillableActivitiesService {
  apiUrl = 'v1/activities/billable';

  constructor(private _http: HttpClient) {}

  public get(projectNumber: string, userId?: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('projectNumber', projectNumber);
    if (userId) {
      params = params.append('userId', userId);
    }

    return this._http
      .get(this.apiUrl, { params: params })
      .map((res: any) => res.result);
  }
}
