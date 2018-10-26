import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class NavigationService {
  constructor(private _http: HttpClient) {}

  public get(): Observable<any> {
    return this._http
      .get('/v1/navigation/detail')
      .map((res: any) => res.result);
  }
}
