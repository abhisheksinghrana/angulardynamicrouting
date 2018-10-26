import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

export interface Spinner {
  show: boolean;
}

@Injectable()
export class SpinnerService {
  spinnerObservable: Observable<Spinner>;
  private _spinnerBehaviorSubject: BehaviorSubject<Spinner>;
  private _count: number;
  private _showSpinner: boolean;

  constructor() {
    this._spinnerBehaviorSubject = <BehaviorSubject<
      Spinner
    >>new BehaviorSubject({});
    this.spinnerObservable = this._spinnerBehaviorSubject.asObservable();
    this._count = 0;
  }

  public startSpinner(): void {
    this._count++;
    this._emitSpinnerStatus();
  }

  public stopSpinner(): void {
    if (this._count > 0) {
      this._count--;
    }
    this._emitSpinnerStatus();
  }

  private _emitSpinnerStatus(): void {
    if (!this._count) {
      this._showSpinner = false;
    } else {
      this._showSpinner = true;
    }
    this._spinnerBehaviorSubject.next({
      show: this._showSpinner
    });
  }
}
