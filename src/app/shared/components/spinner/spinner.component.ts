import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';

import {
  SpinnerService,
  Spinner
} from '../../../core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  spinnerObservable: Observable<Spinner>;
  spinnerData: Spinner;
  alive: boolean;

  constructor(private _spinnerService: SpinnerService) {
    this.spinnerData = {} as Spinner;
    this.spinnerData.show = false;
    this.alive = true;
  }

  ngOnInit() {
    this.spinnerObservable = this._spinnerService.spinnerObservable;

    this.spinnerObservable.takeWhile(() => this.alive).subscribe(data => {
      this.spinnerData.show = data.show;
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
