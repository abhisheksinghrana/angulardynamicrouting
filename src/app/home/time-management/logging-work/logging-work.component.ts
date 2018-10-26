import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { SpinnerService } from '../../../core/services/spinner.service';
import { UtilService } from '../../../shared/services/util.service';
import { TimeWorklogService } from '../services/time-worklog.service';
import { RegionService } from '../../../core/services/region.service';
import { DISABLED } from '@angular/forms/src/model';
@Component({
  selector: 'app-logging-work',
  templateUrl: './logging-work.component.html',
  styleUrls: ['./logging-work.component.scss']
})
export class LoggingWorkComponent implements OnInit, OnDestroy {
  loggingWorkForm: FormGroup;
  alive: boolean;
  regionId: string;
  oldValue: any;
  constructor(
    private _formBuilder: FormBuilder,
    private _spinnerService: SpinnerService,
    private _timeWorklogService: TimeWorklogService,
    private _utilService: UtilService,
    private _regionService: RegionService
  ) {
    this.alive = true;
  }

  ngOnInit() {
    this.regionId = null;
    this.loggingWorkForm = this._formBuilder.group({
      isForecastEnable: false,
      isDisplayForecast: false,
      isDisplayWeekend: false,
      isDisplayCategory: false,
      regionId: null
    });
    this.oldValue = null;
    this.subscribeToRegion();
  }

  subscribeToRegion() {
    this._regionService.regionUpdatedObservable
      .takeWhile(() => this.alive)
      .subscribe((region: string) => {
        if (this.regionId !== region) {
          this.regionId = region;
          this.getLoggingWork();
        }
      });
    if (!this.regionId) {
      this._regionService.triggerRegionUpdated.next();
    }
  }

  getLoggingWork() {
    if (!this.regionId) {
      return;
    }
    this._spinnerService.startSpinner();
    this._timeWorklogService
      .get(this.regionId)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          this.loggingWorkForm.setValue({
            isForecastEnable: response.isForecastEnable,
            isDisplayForecast: response.isDisplayForecast,
            isDisplayWeekend: response.isDisplayWeekend,
            isDisplayCategory: response.isDisplayCategory,
            regionId: this.regionId
          });
          this.changeForecastAvailability();
          this.oldValue = this.loggingWorkForm.getRawValue();
        },
        error => {
          this._utilService.handleError(error);
          this._spinnerService.stopSpinner();
        }
      );
  }

  updateLoggingWork(isUpdateForecast?: boolean) {
    if (isUpdateForecast) {
      this.changeForecastAvailability();
    }
    this.loggingWorkForm.patchValue({ regionId: this.regionId });
    this._spinnerService.startSpinner();
    this._timeWorklogService
      .update(this.loggingWorkForm.value)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this.oldValue = this.loggingWorkForm.getRawValue();
          this._spinnerService.stopSpinner();
        },
        error => {
          this.restoreLoggingWorkForm();
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  changeForecastAvailability() {
    if (this.loggingWorkForm.get('isForecastEnable').value) {
      this.loggingWorkForm.get('isDisplayForecast').enable();
    } else {
      this.loggingWorkForm.patchValue({ isDisplayForecast: false });
      this.loggingWorkForm.get('isDisplayForecast').disable();
    }
  }

  restoreLoggingWorkForm() {
    this.loggingWorkForm.patchValue(this.oldValue);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
