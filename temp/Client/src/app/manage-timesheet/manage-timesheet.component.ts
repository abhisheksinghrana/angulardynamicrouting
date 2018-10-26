import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/takeWhile';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SubmitTimesheetComponent } from '../timesheet/modals/submit-timesheet/submit-timesheet.component';

import { ICalendarNavigation } from '../shared/models/calendar-navigation';
import { UserService } from '../core/services/user.service';
import { SpinnerService } from '../core/services/spinner.service';
import { UtilService } from '../shared/services/util.service';
import { NotificationService } from '../shared/services/notification.service';
import { ThirdPartyConfigurationService } from '../shared/services/third-party-configuration.service';
import { TimesheetService } from '../shared/services/timesheet.service';
import { CalendarNavigationService } from '../shared/services/calendar-navigation.service';
import { AccountRegionSettingService } from '../shared/services/account-region-setting.service';
import { CategoryService } from '../shared/services/category.service';
import { OrganizationService } from '../shared/services/organization.service';
import { ProjectService } from '../shared/services/project.service';
import { RequestTypeService } from '../shared/services/request-type.service';
import { BillableActivitiesService } from '../shared/services/billable-activities.service';
import { NonBillableActivitiesService } from '../shared/services/non-billable-activities.service';
import { WorklogService } from '../shared/services/worklog.service';

import { IWorklog } from '../shared/models/worklog';
import { IAccountRegionSetting } from '../shared/models/account-region-setting';
import { IUserSearch } from '../shared/models/user-search';

import { WorkLogSearchListTypeConstants } from '../shared/constants/worklog-search-list-type.constants';
import { ColorClassConstants } from '../shared/constants/color-class.constants';

import { WorkLogItemType } from '../shared/enums/work-log-item-type.enum';
import { ThirdPartyConfigurationStatus } from '../shared/enums/third-party-configuration-status.enum';

import {
  formatFloat,
  convertArrayToObjForSpecificKey,
  cloneObject
} from '../shared/helper-functions/util';
import { getWorklogClass } from '../shared/helper-functions/worklog-util';

@Component({
  selector: 'app-manage-timesheet',
  templateUrl: './manage-timesheet.component.html',
  styleUrls: ['./manage-timesheet.component.scss']
})
export class ManageTimesheetComponent implements OnInit, OnDestroy {
  workLogSearchListTypeConstants: any;
  workLogItemType: typeof WorkLogItemType;
  thirdPartyConfigurationStatus: any;
  validationTimer: any;
  alive: boolean;

  calendarNavigationDetails: any;
  calendarNavigationDisabled: boolean;
  userSearchPanelDetails: {
    showPanel: boolean;
    isLoading: boolean;
    recentSearchList: any[];
    searchList: any[];
    selectedUserDetail: any;
    regionId: string;
    thirdPartyConfigurationStatus: any;
  };
  userSearchDefaultParams: IUserSearch;
  userSearchParams: any;

  accountRegionSetting: IAccountRegionSetting;
  categoryList: any[];
  categoryListObj: any;
  organizationLevelList: any[];
  projectList: any[];
  activityDetails: any;
  timesheetDetails: any;
  workLogListDetails: {
    list: IWorklog[];
    isLoading: boolean;
    message: string;
  };
  isTimesheetFreezed: boolean;
  isSheetSubmitted: boolean;

  timesheetSummary: any;
  currrentSelectedValue: number;

  contactAdminMsgData: any;
  noRecordFoundMsgData: any;
  userMsgData: any;

  constructor(
    public _userService: UserService,
    private _spinnerService: SpinnerService,
    private _utilService: UtilService,
    private _ngbModal: NgbModal,
    private _notificationService: NotificationService,
    private _thirdPartyConfigurationService: ThirdPartyConfigurationService,
    private _timesheetService: TimesheetService,
    private _calendarNavigationService: CalendarNavigationService,
    private _accountRegionSettingService: AccountRegionSettingService,
    private _categoryService: CategoryService,
    private _organizationService: OrganizationService,
    private _projectService: ProjectService,
    private _requestTypeService: RequestTypeService,
    private _billableActivitiesService: BillableActivitiesService,
    private _nonBillableActivitiesService: NonBillableActivitiesService,
    private _worklogService: WorklogService
  ) {
    this.workLogSearchListTypeConstants = WorkLogSearchListTypeConstants;
    this.workLogItemType = WorkLogItemType;
    this.thirdPartyConfigurationStatus = ThirdPartyConfigurationStatus;
    this.alive = true;

    this.calendarNavigationDetails = {};
    this.calendarNavigationDisabled = true;
    this.userSearchPanelDetails = {
      showPanel: false,
      isLoading: false,
      recentSearchList: [],
      searchList: [],
      selectedUserDetail: null,
      regionId: null,
      thirdPartyConfigurationStatus: null
    };
    this.userSearchDefaultParams = {
      page: 0,
      pageSize: 10,
      searchText: '',
      sortBy: 'FirstName',
      orderByAscending: true,
      isExternalUser: false
    };
    this.categoryList = [];
    this.categoryListObj = {};
    this.projectList = [];
    this.activityDetails = {
      list: [],
      isLoading: false
    };
    this.timesheetDetails = {};
    this.workLogListDetails = {
      list: [],
      isLoading: true,
      message: null
    };
    this.isTimesheetFreezed = false;
    this.isSheetSubmitted = false;

    this.timesheetSummary = {};
    this.currrentSelectedValue = 0;

    this.contactAdminMsgData = {
      title: 'Contact your administrator',
      description:
        'Before you can use the Time Tracker, the administrator needs to configure synergy interface.'
    };

    this.noRecordFoundMsgData = {
      title: 'No logged work, yet.',
      description: 'Use the add new to log your work of this week.'
    };
  }

  ngOnInit() {}

  onUserSelection(item: any) {
    this.userSearchPanelDetails.selectedUserDetail = item;
    this.userSearchPanelDetails.showPanel = false;
    this.saveUserSearch(item);
    this._loadUserConfiguration();
  }

  private _loadUserConfiguration() {
    if (
      !(
        this.userSearchPanelDetails.selectedUserDetail &&
        this.userSearchPanelDetails.selectedUserDetail.id
      )
    ) {
      return;
    }
    this._spinnerService.startSpinner();
    this._thirdPartyConfigurationService
      .get(this.userSearchPanelDetails.selectedUserDetail.id)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          if (response) {
            this.workLogListDetails.isLoading = true;
            this.userSearchPanelDetails.thirdPartyConfigurationStatus =
              response.thirdPartyConfigurationStatus;
            this.userSearchPanelDetails.regionId = response.regionId;
            if (
              this.userSearchPanelDetails.thirdPartyConfigurationStatus ===
              this.thirdPartyConfigurationStatus.configuredButUserNotFound
            ) {
              this.userMsgData = this.contactAdminMsgData;
            } else {
              this.userMsgData = this.noRecordFoundMsgData;
            }
            this._loadTimesheet();
          }
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  private _loadTimesheet() {
    let apis = [
      this._accountRegionSettingService.get(
        this.userSearchPanelDetails.regionId,
        this.userSearchPanelDetails.selectedUserDetail.id
      ),
      this._calendarNavigationService.getCalendarNavigationDetails()
    ];

    if (
      this.userSearchPanelDetails.thirdPartyConfigurationStatus !==
      this.thirdPartyConfigurationStatus.configuredButUserNotFound
    ) {
      apis = [
        ...apis,
        this._categoryService.get(
          this.userSearchPanelDetails.regionId,
          this.userSearchPanelDetails.selectedUserDetail.id
        ),
        this._organizationService.getLevel()
      ];
    }

    const thirdPartyConfigurationApis = [
      this._projectService.get(
        this.userSearchPanelDetails.selectedUserDetail.id
      ),
      this._requestTypeService.get(
        this.userSearchPanelDetails.selectedUserDetail.id
      )
    ];

    if (
      this.userSearchPanelDetails.thirdPartyConfigurationStatus ===
      this.thirdPartyConfigurationStatus.configured
    ) {
      apis.push(...thirdPartyConfigurationApis);
    }
    this._spinnerService.startSpinner();
    Observable.forkJoin(...apis)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          this.accountRegionSetting = response[0];
          this.calendarNavigationDetails = response[1];
          this.calendarNavigationDisabled = false;
          if (
            this.userSearchPanelDetails.thirdPartyConfigurationStatus !==
            this.thirdPartyConfigurationStatus.configuredButUserNotFound
          ) {
            this.categoryList = response[2];
            for (let i = 0; i < this.categoryList.length; i++) {
              this.categoryList[i].colorClass = ColorClassConstants[i % 5];
            }
            this.categoryListObj = convertArrayToObjForSpecificKey(
              this.categoryList,
              'id'
            );
            this.organizationLevelList = response[3].orgLevelTreeNodes;
          }
          if (
            this.userSearchPanelDetails.thirdPartyConfigurationStatus ===
            this.thirdPartyConfigurationStatus.configured
          ) {
            this.projectList = [...response[4], ...response[5]];
          }
          if (
            this.userSearchPanelDetails.thirdPartyConfigurationStatus !==
            this.thirdPartyConfigurationStatus.configuredButUserNotFound
          ) {
            this.getTimesheet();
          } else {
            this.workLogListDetails.isLoading = false;
          }
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  getCalendarNavigation(params: ICalendarNavigation): void {
    if (!params.isAllowed) {
      return;
    }
    this._spinnerService.startSpinner();
    this._calendarNavigationService
      .getCalendarNavigationDetails(params.actionType, params.startDate)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          this.calendarNavigationDetails = response;
          this.calendarNavigationDisabled = false;
          if (
            this.userSearchPanelDetails.thirdPartyConfigurationStatus !==
            this.thirdPartyConfigurationStatus.configuredButUserNotFound
          ) {
            this.getTimesheet();
          }
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  getUserSearchDefaultParams() {
    return Object.assign({}, this.userSearchDefaultParams);
  }

  getUserList(searchParams) {
    if (!searchParams.searchText) {
      this.userSearchPanelDetails.searchList = [];
      return;
    }
    this._spinnerService.startSpinner();
    this._userService
      .search(searchParams)
      .takeWhile(() => this.alive)
      .subscribe(
        (response: any) => {
          this._spinnerService.stopSpinner();
          this.userSearchPanelDetails.searchList = response.items;
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  getRecentUserSearchList(recentSearchParams) {
    this._spinnerService.startSpinner();
    this._userService
      .getRecentUserSearchList(recentSearchParams)
      .takeWhile(() => this.alive)
      .subscribe(
        (response: any) => {
          this._spinnerService.stopSpinner();
          this.userSearchPanelDetails.recentSearchList = response;
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  onUserDropdownClick() {
    this.userSearchParams = this.getUserSearchDefaultParams();
    this.userSearchPanelDetails.showPanel = true;
  }

  saveUserSearch(item) {
    if (item && item.id) {
      const params: any = {};
      params.id = item.id;
      this._spinnerService.startSpinner();
      this._userService
        .saveUsersearch(params)
        .takeWhile(() => this.alive)
        .subscribe(
          () => {
            this._spinnerService.stopSpinner();
          },
          error => {
            this._spinnerService.stopSpinner();
            this._utilService.handleError(error);
          }
        );
    }
  }

  resetUserSearchPanel() {
    this.userSearchPanelDetails.showPanel = false;
  }

  toogleDisplayForecast() {
    this.accountRegionSetting.isDisplayForecast = !this.accountRegionSetting
      .isDisplayForecast;
    this.updateAccountRegionSetting();
  }

  toogleDisplayWeekend() {
    this.accountRegionSetting.isDisplayWeekend = !this.accountRegionSetting
      .isDisplayWeekend;
    this.updateAccountRegionSetting();
  }

  updateAccountRegionSetting() {
    this._spinnerService.startSpinner();
    if (this.accountRegionSetting) {
      this.accountRegionSetting.userId = this.userSearchPanelDetails.selectedUserDetail.id;
    }
    this._accountRegionSettingService
      .update(this.accountRegionSetting)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  getTimesheet() {
    this.workLogListDetails.isLoading = true;
    this.isSheetSubmitted = false;
    this._spinnerService.startSpinner();
    this._timesheetService
      .getTimesheet(
        this.calendarNavigationDetails.startDate,
        this.calendarNavigationDetails.endDate,
        this.userSearchPanelDetails.regionId,
        this.userSearchPanelDetails.selectedUserDetail.id
      )
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          this.resetTimesheet();
          this.timesheetDetails = response;
          this.workLogListDetails = {
            list: [],
            isLoading: false,
            message: null
          };
          this.isTimesheetFreezed = false;
          if (this.timesheetDetails) {
            this.isTimesheetFreezed = this.timesheetDetails.isFreezed;
            for (const worklog of this.timesheetDetails.workLogs) {
              const workDays = cloneObject(this.calendarNavigationDetails.days);
              const tempDays = [];
              for (const workDay of workDays) {
                const result = worklog.workLogDetails.filter((item, index) => {
                  return workDay.weekDay === item.weekDay;
                });
                if (result.length) {
                  if (Number(result[0].spent) === 0) {
                    result[0].spent = '';
                  }
                  tempDays.push(result[0]);
                } else {
                  tempDays.push(workDay);
                }
              }
              worklog.workLogDetails = tempDays;

              const tempCategory = this.categoryList.filter((item, index) => {
                if (worklog.categoryId === item.id) {
                  return item;
                }
              });
              if (tempCategory.length) {
                worklog.categoryName = tempCategory[0].name;
                worklog.categoryColorClass = tempCategory[0].colorClass;
              }

              worklog.workLogItemClass = '';
              if (worklog.workLogItemType === this.workLogItemType.workItem) {
                worklog.workLogItemClass = getWorklogClass(
                  worklog.workLogItemType,
                  worklog.workItem.workItemType
                );
              } else {
                worklog.workLogItemClass = getWorklogClass(
                  worklog.workLogItemType
                );
              }

              this.calculateTotalSpentWorkLogWise(worklog, false);
              this.workLogListDetails.list.push(worklog);
            }
            if (this.workLogListDetails.list.length) {
              this.calculateTotalSpentForTimesheet();
              this.calculateTotalSpentForAllWeekDays();
            }
          }
          if (!this._userService.userDetails.permissionsObj['SaveTimeSheet']) {
            this.isTimesheetFreezed = true;
          }
          this.workLogListDetails.isLoading = false;
        },
        error => {
          this.workLogListDetails.isLoading = false;
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  validateTimesheet() {
    this.workLogListDetails.message = null;
    this.isSheetSubmitted = true;
    const params: any = {};
    params.id = this.timesheetDetails ? this.timesheetDetails.id : '';
    params.startDate = this.calendarNavigationDetails.startDate;
    params.endDate = this.calendarNavigationDetails.endDate;
    params.regionId = this.userSearchPanelDetails.regionId;
    params.employeeId = this.userSearchPanelDetails.selectedUserDetail.id;
    params.isSubmit = true;
    params.workLogs = [];

    for (const worklog of this.workLogListDetails.list) {
      let isValid = true;
      if (worklog.work && !(worklog.work = worklog.work.trim())) {
        worklog.enableEditWork = true;
      }
      if (
        !worklog.work &&
        !(worklog.workItem && worklog.workItem.title) &&
        !worklog.internalCategoryName
      ) {
        isValid = false;
      }

      if (
        this.userSearchPanelDetails.thirdPartyConfigurationStatus ===
        this.thirdPartyConfigurationStatus.configured
      ) {
        if (
          !worklog.synergyDetail ||
          !worklog.synergyDetail.activity ||
          !worklog.synergyDetail.project
        ) {
          isValid = false;
        }
      }

      if (
        (worklog.workLogItemType === this.workLogItemType.workItem &&
          !(worklog.level && worklog.level.id)) ||
        (worklog.workLogItemType === this.workLogItemType.internalCategory &&
          !worklog.categoryId)
      ) {
        isValid = false;
      }

      if (!worklog.totalSpent) {
        isValid = false;
      }

      if (!isValid) {
        this.workLogListDetails.message = 'Kindly fill the highlighted fields.';
        if (this.validationTimer) {
          clearTimeout(this.validationTimer);
        }
        this.validationTimer = setTimeout(() => {
          this.workLogListDetails.message = null;
        }, 3000);
        return;
      }

      params.workLogs.push(worklog);
    }

    this.calculateTotalSpentForTimesheet();
    this.calculateTotalSpentForAllWeekDays();
    this.submitTimesheet(params);
  }

  submitTimesheet(params) {
    const data: any = {
      weeklyWorkingHours: this.timesheetDetails.weeklyWorkingHours,
      totalSpentHours: this.timesheetSummary.totalSpentForTimesheet
    };

    const submitTimesheetModalInstance = this._ngbModal.open(
      SubmitTimesheetComponent,
      {
        windowClass: 'submit-timesheet-modal',
        backdrop: 'static',
        keyboard: false
      }
    );

    submitTimesheetModalInstance.componentInstance.data = data;

    submitTimesheetModalInstance.result.then((result: any) => {
      if (result) {
        this.manageTimesheet(params);
      }
    });
  }

  manageTimesheet(params: any) {
    this._spinnerService.startSpinner();
    this._timesheetService
      .manageTimesheet(params)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          this.getTimesheet();
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  resetTimesheet() {
    this.timesheetSummary.totalSpentForTimesheet = 0;
    this.timesheetSummary.totalSpentForWeekDays = {};
    this.timesheetSummary.totalSpentForWeekDaysArr = [];
  }

  calculateTotalSpentWorkLogWise(worklog: any, calculateTotalSpent: boolean) {
    worklog.totalSpent = 0;
    for (const days of worklog.workLogDetails) {
      if (!isNaN(formatFloat(days.spent)) && formatFloat(days.spent) >= 0) {
        worklog.totalSpent += formatFloat(days.spent);
      }
    }
    worklog.totalSpent = formatFloat(worklog.totalSpent);
    if (calculateTotalSpent) {
      this.calculateTotalSpentForTimesheet();
    }
  }

  calculateTotalSpentForTimesheet() {
    this.timesheetSummary.totalSpentForTimesheet = 0;
    for (const worklog of this.workLogListDetails.list) {
      this.timesheetSummary.totalSpentForTimesheet += formatFloat(
        worklog.totalSpent
      );
    }
  }

  calculateTotalSpentForAllWeekDays() {
    for (const workDay of this.calendarNavigationDetails.days) {
      this.calculateTotalSpentWeekDayWise({
        weekDay: workDay.weekDay,
        calculateFinalArray: false
      });
    }
    this.convertTotalSpentForWeekDaysInArray();
  }

  calculateTotalSpentWeekDayWise({ weekDay, calculateFinalArray }) {
    this.timesheetSummary.totalSpentForWeekDays[weekDay + 'day'] = {
      spent: 0,
      weekDay: weekDay
    };
    for (const worklog of this.workLogListDetails.list) {
      const result = worklog.workLogDetails.filter((item, index) => {
        return weekDay === item.weekDay;
      });
      if (result.length && result[0].spent) {
        this.timesheetSummary.totalSpentForWeekDays[
          weekDay + 'day'
        ].spent += formatFloat(result[0].spent);
      }
    }
    if (calculateFinalArray) {
      this.convertTotalSpentForWeekDaysInArray();
    }
  }

  convertTotalSpentForWeekDaysInArray() {
    this.timesheetSummary.totalSpentForWeekDaysArr = [];
    for (const weekDayKey in this.timesheetSummary.totalSpentForWeekDays) {
      this.timesheetSummary.totalSpentForWeekDaysArr.push(
        this.timesheetSummary.totalSpentForWeekDays[weekDayKey]
      );
    }
  }

  saveDescription({ popover, worklog }) {
    if (!worklog.tempDescription) {
      return;
    }
    worklog.description = worklog.tempDescription;

    if (!worklog.id) {
      popover.close();
      return;
    }

    const params: any = {};
    params.id = worklog.id;
    params.description = worklog.description;

    this._spinnerService.startSpinner();
    this._worklogService.updateDescription(worklog).subscribe(
      response => {
        this._spinnerService.stopSpinner();
        popover.close();
      },
      error => {
        this._spinnerService.stopSpinner();
      }
    );
  }

  onSelectProject(worklog: any, project: any) {
    this.resetActivitiesDetails();
  }

  resetActivitiesDetails() {
    this.activityDetails = {
      list: [],
      isLoading: false
    };
  }

  onSelectActivity(worklog: any, activity: any) {
    worklog.synergyDetail.activity = activity;
  }

  getBillableActivities(projectNumber: string) {
    if (projectNumber) {
      this._spinnerService.startSpinner();
      this._billableActivitiesService
        .get(projectNumber, this.userSearchPanelDetails.selectedUserDetail.id)
        .takeWhile(() => this.alive)
        .subscribe(
          response => {
            this._spinnerService.stopSpinner();
            this.activityDetails.list = response;
          },
          error => {
            this._spinnerService.stopSpinner();
            this._utilService.handleError(error);
          }
        );
    }
  }

  getNonBillableActivities(requestType: string | number) {
    if (requestType) {
      this._spinnerService.startSpinner();
      this._nonBillableActivitiesService
        .get(requestType, this.userSearchPanelDetails.selectedUserDetail.id)
        .takeWhile(() => this.alive)
        .subscribe(
          response => {
            this._spinnerService.stopSpinner();
            this.activityDetails.list = response;
          },
          error => {
            this._spinnerService.stopSpinner();
            this._utilService.handleError(error);
          }
        );
    }
  }

  updateCurrentlySelectedValue(value: number) {
    this.currrentSelectedValue = value;
  }

  restoreValue(work: any) {
    if (!work.spent && work.spent == 0) {
      if (this.currrentSelectedValue != 0) {
        work.spent = this.currrentSelectedValue;
      } else {
        work.spent = '';
      }
    }
  }

  validateDayLogTimeLimit({ worklog, work }) {
    this.restoreValue(work);
    this.calculateTotalSpentWeekDayWise({
      weekDay: work.weekDay,
      calculateFinalArray: false
    });
    if (
      this.timesheetSummary.totalSpentForWeekDays[work.weekDay + 'day'].spent >
      24
    ) {
      work.spent = this.currrentSelectedValue;
      this._notificationService.openNotificationModal({
        title: 'Error',
        description: 'Max log limit for a day is 24 hours.'
      });
    }
    this.calculateTotalSpentWorkLogWise(worklog, true);
    this.calculateTotalSpentWeekDayWise({
      weekDay: work.weekDay,
      calculateFinalArray: true
    });
  }

  onDeleteWorklogConfirmationResponse({ response, worklog, index }) {
    worklog.showDeleteWorklogConfirmationBar = false;
    if (response) {
      this.deleteWorklog(worklog.id, index);
    }
  }

  deleteWorklog(workLogId, index) {
    if (!workLogId) {
      this.workLogListDetails.list.splice(index, 1);
      this.calculateTotalSpentForTimesheet();
      this.calculateTotalSpentForAllWeekDays();
      return;
    }
    const params: any = {};
    params.workLogId = workLogId;
    this._spinnerService.startSpinner();
    this._worklogService
      .manageDelete(params)
      .takeWhile(() => this.alive)
      .subscribe(
        () => {
          this._spinnerService.stopSpinner();
          this.workLogListDetails.list.splice(index, 1);
          this.calculateTotalSpentForTimesheet();
          this.calculateTotalSpentForAllWeekDays();
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  ngOnDestroy() {
    this.alive = false;
    if (this.validationTimer) {
      clearTimeout(this.validationTimer);
    }
  }
}
