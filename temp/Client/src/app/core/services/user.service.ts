import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { getObjectPropertyValue } from '../../shared/helper-functions/util';

@Injectable()
export class UserService {
  private userData: any;

  constructor(private _http: HttpClient) {
    this.userData = {};
  }

  public load(): Promise<any> {
    return this._http
      .get('/v1/user/info')
      .map((res: any) => res.result)
      .toPromise()
      .then(
        response => {
          this.userData = response;
          this.userData.permissionsObj = {};
          if (this.userData && this.userData.permissions) {
            for (const permission of this.userData.permissions) {
              this.userData.permissionsObj[permission] = true;
            }
          }
        },
        error => {
          this.userData = {};
        }
      );
  }

  public search(queryParams: any) {
    let queryUrl = '';
    queryUrl += getObjectPropertyValue.call(queryParams, 'page');
    queryUrl += getObjectPropertyValue.call(queryParams, 'pageSize');
    queryUrl += getObjectPropertyValue.call(queryParams, 'searchText');
    queryUrl += getObjectPropertyValue.call(queryParams, 'sortBy');
    queryUrl += getObjectPropertyValue.call(queryParams, 'orderByAscending');
    queryUrl += getObjectPropertyValue.call(queryParams, 'isExternalUser');
    return this._http
      .get('/v1/user/search' + queryUrl)
      .map((res: any) => res.result);
  }

  public getRecentUserSearchList(queryParams: any) {
    let queryUrl = '';
    queryUrl += getObjectPropertyValue.call(queryParams, 'page');
    queryUrl += getObjectPropertyValue.call(queryParams, 'pageSize');
    return this._http
      .get('v1/usersearch' + queryUrl)
      .map((res: any) => res.result);
  }

  public saveUsersearch(params: any) {
    return this._http
      .post('v1/usersearch', params)
      .map((res: any) => res.result);
  }

  public get userDetails() {
    return this.userData;
  }
}
