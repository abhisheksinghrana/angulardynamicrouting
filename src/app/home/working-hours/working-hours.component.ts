import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/takeWhile';

import { RegionService } from '../../core/services/region.service';
import { UserService } from '../../core/services/user.service';
import { GeneralSettingsService } from '../../shared/services/general-settings.service';
import { UtilService } from '../../shared/services/util.service';
import { NotificationService } from '../../shared/services/notification.service';

import { WeekdaysConstants } from '../../shared/constants/weekdays.constants';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss']
})
export class WorkingHoursComponent implements OnInit, OnDestroy {
  generalSettingsForm: FormGroup;
  isGeneralSettingsFormSubmitted: boolean;
  weekdaysList: any[];
  daysList: any[];

  regionList: any[];
  regionId: any;

  alive: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _regionService: RegionService,
    private _generalSettingsService: GeneralSettingsService,
    private _utilService: UtilService,
    private _notificationService: NotificationService
  ) {
    this.isGeneralSettingsFormSubmitted = false;
    this.weekdaysList = WeekdaysConstants;
    this.daysList = [];
    this.regionList = [];
    this.regionId = '';
    this.alive = true;
  }

  ngOnInit() {
    this.getRegionList();
    this.generalSettingsForm = this._formBuilder.group({
      id: [''],
      days: [[]],
      weekStartAt: [1, [Validators.required]],
      workingHours: ['', [Validators.max(24), Validators.maxLength(5)]],
      regionId: [''],
      accountId: ['']
    });
  }

  getRegionList() {
    this._regionService
      .getRegionList()
      .takeWhile(() => this.alive)
      .subscribe(regions => {
        this.regionList = regions;
        this.regionId = '';
        for (const region of this.regionList) {
          if (region.id === this._userService.userDetails.userRegion.id) {
            this.regionId = region.id;
            break;
          }
        }
        this.getRegionWiseData();
      });
  }

  getRegionWiseData() {
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this._generalSettingsService
      .get(this.regionId)
      .takeWhile(() => this.alive)
      .subscribe(
        result => {
          if (result) {
            this.generalSettingsForm.setValue({
              id: result.id,
              days: result.days,
              weekStartAt: result.weekStartAt || 1,
              workingHours: result.workingHours,
              regionId: result.regionId,
              accountId: result.accountId
            });

            this.daysList = [];
            if (result.days.length) {
              for (const day of result.days) {
                this.daysList.push(
                  this.weekdaysList.filter((ele, pos) => {
                    return ele.id == day;
                  })[0]
                );
              }
            }
          }
        },
        error => {
          this._utilService.handleError(error);
        }
      );
  }

  submitGeneralSettingsForm() {
    const params: any = {};
    const paramDay = [];
    for (const day of this.daysList) {
      paramDay.push(day.id);
    }
    params.id = this.generalSettingsForm.controls.id.value;
    params.days = paramDay;
    params.weekStartAt = this.generalSettingsForm.controls.weekStartAt.value;
    params.workingHours = this.generalSettingsForm.controls.workingHours.value;
    params.regionId = this.regionId;
    params.accountId = this.generalSettingsForm.controls.accountId.value;

    this._generalSettingsService
      .save(params)
      .takeWhile(() => this.alive)
      .subscribe(
        result => {
          if (result) {
            this._notificationService.openNotificationModal({
              title: 'Info',
              description: 'General settings saved successfully.'
            });
          } else {
            this._utilService.handleError();
          }
        },
        error => {
          this._utilService.handleError(error);
        }
      );
  }

  onGeneralSettingsFormSubmit() {
    this.isGeneralSettingsFormSubmitted = true;
    this.submitGeneralSettingsForm();
  }

  resetGeneralSettingsForm() {
    this.generalSettingsForm.reset();
    this.isGeneralSettingsFormSubmitted = false;
    this.daysList = [];
    this.getGeneralSettings();
  }

  refreshWeekdayDropdown(event) {
    this.daysList = event;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
