import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {
  constructor(private _http: HttpClient) {}

  public get(userId?: string): Observable<any> {
    let params = new HttpParams();
    if (userId) {
      params = params.append('userId', userId);
    }

    return this._http
      .get(`/v1/project/all`, { params: params })
      .map((res: any) => res.result);
  }
}
