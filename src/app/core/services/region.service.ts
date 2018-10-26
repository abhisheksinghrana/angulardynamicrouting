import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class RegionService {
  private regionUpdated: Subject<string>;
  public regionUpdatedObservable: Observable<string>;
  public triggerRegionUpdated: Subject<any>;

  constructor(private _http: HttpClient) {
    this.regionUpdated = new Subject<string>();
    this.triggerRegionUpdated = new Subject<any>();
    this.regionUpdatedObservable = this.regionUpdated.asObservable();
  }

  public getRegionList(): Observable<any> {
    return this._http.get('/v1/region/all').map((res: any) => res.result);
  }

  updateRegion(regionId: string) {
    this.regionUpdated.next(regionId);
  }
}
