import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WorkItemService {
  apiUrl = '/v1/workitem';

  constructor(private _http: HttpClient) {}

  public get(queryParams: any): Observable<any> {
    return this._http
      .get(this.apiUrl, { params: queryParams })
      .map((res: any) => res.result);
  }
}
