import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Promise } from 'q';

@Injectable()
export class UserService {
  private userData: any;

  constructor(private _http: HttpClient) {
    this.userData = {};
  }

  public load(): Promise<any> {
    return Promise((resolve, reject): any => {
      this._http
        .get('/v1/user/detail')
        .map((res: any) => res.result)
        .toPromise()
        .then(
          response => {
            this.userData = response;
            resolve(this.userData);
          },
          error => {
            this.userData = {};
            resolve(this.userData);
          }
        );
    });
  }

  public get userDetails() {
    return this.userData;
  }
}
