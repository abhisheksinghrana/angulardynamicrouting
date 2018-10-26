import { Component, OnInit } from '@angular/core';

import { HolidayService } from './services/holiday.service';
import { RegionService } from '../../core/services/region.service';

@Component({
  selector: 'app-holiday-leaves',
  templateUrl: './holiday-leaves.component.html',
  styleUrls: ['./holiday-leaves.component.scss']
})
export class HolidayLeavesComponent implements OnInit {
  datepickerOptions: any = {
    dateFormat: 'dd-M-yy',
    changeYear: true,
    changeMonth: true
  };
  addHolidayFormData: any;
  holidayDetails: any;
  holidayList: any[];
  regionId: string;
  alive: boolean;

  constructor(
    private _holidayService: HolidayService,
    private _regionService: RegionService
  ) {
    this.addHolidayFormData = {};
    this.holidayDetails = {
      yearList: [],
      year: ''
    };
    this.holidayList = [];
    this.alive = true;
  }

  ngOnInit() {
    this.regionId = null;
    this.subscribeToRegion();
  }
  subscribeToRegion() {
    this._regionService.regionUpdatedObservable
      .takeWhile(() => this.alive)
      .subscribe((region: string) => {
        if (this.regionId !== region) {
          this.regionId = region;
          this.getHolidayYearList();
        }
      });
    if (!this.regionId) {
      this._regionService.triggerRegionUpdated.next();
    }
  }

  getHolidayYearList() {
    this._holidayService.getYearList(this.regionId).subscribe(result => {
      this.holidayDetails.yearList = result;
      this.holidayDetails.year = '';
      if (this.holidayDetails.yearList.length) {
        let currentYear = new Date().getFullYear();
        if (this.holidayDetails.yearList.indexOf(currentYear) > -1) {
          this.holidayDetails.year = currentYear;
        } else {
          this.holidayDetails.year = this.holidayDetails.yearList[0];
        }
      }
      this.getHolidays();
    });
  }

  getHolidays() {
    this.holidayList = [];
    if (this.holidayDetails.year) {
      // this._spinnerService.startSpinner();
      this._holidayService
        .getHolidays(this.holidayDetails.year, this.regionId)
        .subscribe(
          holidays => {
            // this._spinnerService.stopSpinner();
            this.holidayList = holidays;
          },
          error => {
            // this._spinnerService.stopSpinner();
          }
        );
    }
  }
}
