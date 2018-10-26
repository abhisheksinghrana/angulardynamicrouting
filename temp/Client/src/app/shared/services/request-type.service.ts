import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequestTypeService {
  apiUrl = '/v1/requesttype';

  constructor(private _http: HttpClient) {}

  public get(userId?: string): Observable<any> {
    let params = new HttpParams();
    if (userId) {
      params = params.append('userId', userId);
    }

    return this._http
      .get(`${this.apiUrl}/nonbillable`, { params: params })
      .map((res: any) => res.result);
  }
}
