import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  SpinnerService,
  Spinner
} from '../../../core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  spinnerObservable: Observable<Spinner>;
  spinnerData: Spinner;

  constructor(private _spinnerService: SpinnerService) {
    this.spinnerData = {} as Spinner;
    this.spinnerData.show = false;
  }

  ngOnInit() {
    this.spinnerObservable = this._spinnerService.spinnerObservable;

    this.spinnerObservable.subscribe(data => {
      this.spinnerData.show = data.show;
    });
  }
}
