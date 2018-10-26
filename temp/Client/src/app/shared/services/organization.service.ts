import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class OrganizationService {
  constructor(private _http: HttpClient) {}

  public getSquad(regionId?: string): Observable<any> {
    return this._http
      .get('/v1/organization/squad')
      .map((res: any) => res.result);
  }

  public getLevel(regionId?: string): Observable<any> {
    return this._http
      .get('/v1/organization/level')
      .map((res: any) => res.result);
  }
}
