import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/takeWhile';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SubmitTimesheetComponent } from './modals/submit-timesheet/submit-timesheet.component';

import { UserService } from '../core/services/user.service';
import { SpinnerService } from '../core/services/spinner.service';
import { UtilService } from '../shared/services/util.service';
import { NotificationService } from '../shared/services/notification.service';
import { TimesheetService } from '../shared/services/timesheet.service';
import { CalendarNavigationService } from '../shared/services/calendar-navigation.service';
import { AccountRegionSettingService } from '../shared/services/account-region-setting.service';
import { CategoryService } from '../shared/services/category.service';
import { OrganizationService } from '../shared/services/organization.service';
import { InternalCategoryService } from '../shared/services/internal-category.service';
import { ProjectService } from '../shared/services/project.service';
import { RequestTypeService } from '../shared/services/request-type.service';
import { BillableActivitiesService } from '../shared/services/billable-activities.service';
import { NonBillableActivitiesService } from '../shared/services/non-billable-activities.service';
import { WorklogService } from '../shared/services/worklog.service';
import { WorkItemService } from '../shared/services/work-item.service';

import { IWorklog } from '../shared/models/worklog';
import { IAccountRegionSetting } from '../shared/models/account-region-setting';

import { WorkLogSearchListTypeConstants } from '../shared/constants/worklog-search-list-type.constants';
import { ColorClassConstants } from '../shared/constants/color-class.constants';

import { WeekActionType } from '../shared/enums/week-action-type.enum';
import { WorkLogItemType } from '../shared/enums/work-log-item-type.enum';
import { ThirdPartyConfigurationStatus } from '../shared/enums/third-party-configuration-status.enum';

import {
  formatFloat,
  convertArrayToObjForSpecificKey,
  cloneObject
} from '../shared/helper-functions/util';
import { getWorklogClass } from '../shared/helper-functions/worklog-util';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit, OnDestroy {
  @ViewChild('logWorkInputField')
  logWorkInputField: ElementRef;
  @ViewChild('quickAddForm')
  quickAddForm: any;

  workLogSearchListTypeConstants: any;
  weekActionType: typeof WeekActionType;
  workLogItemType: typeof WorkLogItemType;
  thirdPartyConfigurationStatus: any;
  workItemSearchTimer: any;
  validationTimer: any;
  alive: boolean;

  calendarNavigationDetails: any;
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
  isSheetSaved: boolean;
  isSheetSubmitted: boolean;
  logWorkPanelData: any;
  newWorklog: any;
  selectedWorkItemFromPanel: any;

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
    private _timesheetService: TimesheetService,
    private _calendarNavigationService: CalendarNavigationService,
    private _accountRegionSettingService: AccountRegionSettingService,
    private _categoryService: CategoryService,
    private _organizationService: OrganizationService,
    private _internalCategoryService: InternalCategoryService,
    private _projectService: ProjectService,
    private _requestTypeService: RequestTypeService,
    private _billableActivitiesService: BillableActivitiesService,
    private _nonBillableActivitiesService: NonBillableActivitiesService,
    private _worklogService: WorklogService,
    private _workItemService: WorkItemService
  ) {
    this.workLogSearchListTypeConstants = WorkLogSearchListTypeConstants;
    this.weekActionType = WeekActionType;
    this.workLogItemType = WorkLogItemType;
    this.thirdPartyConfigurationStatus = ThirdPartyConfigurationStatus;
    this.alive = true;

    this.calendarNavigationDetails = {};
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
    this.isSheetSaved = false;
    this.isSheetSubmitted = false;
    this.logWorkPanelData = {
      showAddLayout: false,
      showLogWorkPanel: false,
      logPanelWidth: 0,
      selectedListType: this.workLogSearchListTypeConstants.workItems,
      workItemSearchDetails: {
        list: [],
        page: 1,
        pagesize: 10,
        isLoading: false,
        isLoadMore: true
      },
      internalCategorySearchDetails: {
        list: [],
        isLoading: false
      }
    };
    this.newWorklog = {
      synergyDetail: {}
    };
    this.selectedWorkItemFromPanel = {};

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

    if (
      this.thirdPartyConfigurationStatus.configuredButUserNotFound ===
      this._userService.userDetails.thirdPartyConfigurationStatus
    ) {
      this.userMsgData = this.contactAdminMsgData;
    } else {
      this.userMsgData = this.noRecordFoundMsgData;
    }
  }

  ngOnInit() {
    this._init();
  }

  private _init() {
    if (
      this._userService.userDetails.userRegion &&
      this._userService.userDetails.userRegion.id
    ) {
      this._spinnerService.startSpinner();
      const apis = [
        this._accountRegionSettingService.get(
          this._userService.userDetails.userRegion.id
        ),
        this._categoryService.get(this._userService.userDetails.userRegion.id),
        this._organizationService.getLevel()
      ];
      const thirdPartyConfigurationApis = [
        this._projectService.get(),
        this._requestTypeService.get()
      ];

      if (
        this.thirdPartyConfigurationStatus.configured ===
        this._userService.userDetails.thirdPartyConfigurationStatus
      ) {
        apis.push(...thirdPartyConfigurationApis);
      }
      Observable.forkJoin(...apis)
        .takeWhile(() => this.alive)
        .subscribe(
          response => {
            this._spinnerService.stopSpinner();
            this.accountRegionSetting = response[0];
            this.categoryList = response[1];
            for (let i = 0; i < this.categoryList.length; i++) {
              this.categoryList[i].colorClass = ColorClassConstants[i % 5];
            }
            this.categoryListObj = convertArrayToObjForSpecificKey(
              this.categoryList,
              'id'
            );
            this.organizationLevelList = response[2].orgLevelTreeNodes;
            if (
              this.thirdPartyConfigurationStatus.configured ===
              this._userService.userDetails.thirdPartyConfigurationStatus
            ) {
              this.projectList = [...response[3], ...response[4]];
            }
            this.getCalendarNavigation(true);
          },
          error => {
            this._spinnerService.stopSpinner();
            this._utilService.handleError(error);
          }
        );
    }
  }

  getCalendarNavigation(
    isAllowed: boolean,
    actionType?: number,
    startDate?: string
  ) {
    if (!isAllowed) {
      return;
    }
    this.resetAddNewWorkLog();
    this.resetActivitiesDetails();
    this._spinnerService.startSpinner();
    this._calendarNavigationService
      .getCalendarNavigationDetails(actionType, startDate)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          this.calendarNavigationDetails = response;
          if (
            this.thirdPartyConfigurationStatus.configuredButUserNotFound !==
            this._userService.userDetails.thirdPartyConfigurationStatus
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

  getTimesheet() {
    this.workLogListDetails.isLoading = true;
    this.isSheetSaved = false;
    this.isSheetSubmitted = false;
    this._spinnerService.startSpinner();
    this._timesheetService
      .getTimesheet(
        this.calendarNavigationDetails.startDate,
        this.calendarNavigationDetails.endDate,
        this._userService.userDetails.userRegion.id
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
        },
        error => {
          this.workLogListDetails.isLoading = false;
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  getBillableActivities(projectNumber: string) {
    if (projectNumber) {
      this._spinnerService.startSpinner();
      this._billableActivitiesService
        .get(projectNumber)
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
        .get(requestType)
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

  getActivities(project: any) {
    this.resetActivitiesDetails();
    if (project && project.code) {
      if (project.isBillable) {
        this.getBillableActivities(project.code);
      } else {
        this.getNonBillableActivities(project.code);
      }
    }
  }

  resetActivitiesDetails() {
    this.activityDetails = {
      list: [],
      isLoading: false
    };
  }

  fillAddWorkLog(item: any = {}, type: number) {
    this.selectedWorkItemFromPanel = item;
    this.newWorklog.workLogItemType = type;
    if (this.newWorklog.workLogItemType === this.workLogItemType.workItem) {
      this.newWorklog.workItem = item;
      this.newWorklog.level = item.level;
      this.newWorklog.searchText = item.title;
      this.newWorklog.workLogItemClass = item.workLogItemClass;
    } else if (
      this.newWorklog.workLogItemType === this.workLogItemType.internalCategory
    ) {
      this.newWorklog = Object.assign(this.newWorklog, item);
      this.newWorklog.searchText = item.name;
      this.newWorklog.internalCategoryId = item.id;
      this.newWorklog.internalCategoryName = item.name;
      this.newWorklog.categoryId = item.categoryId;
      this.newWorklog.categoryName = item.categoryName;
      this.newWorklog.categoryColorClass = item.categoryColorClass;
      this.newWorklog.workItem = null;
    } else {
      this.newWorklog = Object.assign(this.newWorklog, item);
      this.newWorklog.work = item.searchText;
      this.newWorklog.workItem = null;
      this.newWorklog.workLogItemClass = getWorklogClass(
        this.workLogItemType.work
      );
    }
    this.newWorklog.id = null;
    this.logWorkPanelData.showLogWorkPanel = false;
    this.resetLogWorkSearchPanel();
  }

  addNewWorkLog(form) {
    if (!form.valid) {
      return;
    }

    if (
      this.newWorklog.workLogItemType === this.workLogItemType.workItem &&
      this.selectedWorkItemFromPanel.title !== this.newWorklog.searchText
    ) {
      this.newWorklog.workLogItemType = this.workLogItemType.work;
      this.newWorklog.workItem = null;
      this.newWorklog.workLogItemClass = getWorklogClass(
        this.workLogItemType.work
      );
    }

    if (
      this.newWorklog.workLogItemType ===
        this.workLogItemType.internalCategory &&
      this.selectedWorkItemFromPanel.name !== this.newWorklog.searchText
    ) {
      this.newWorklog.workLogItemType = this.workLogItemType.work;
      this.newWorklog.internalCategoryId = null;
      this.newWorklog.internalCategoryName = null;
      this.newWorklog.workLogItemClass = getWorklogClass(
        this.workLogItemType.work
      );
    }

    if (!this.newWorklog.workLogItemType) {
      this.newWorklog.workLogItemType = this.workLogItemType.work;
      this.newWorklog.workLogItemClass = getWorklogClass(
        this.workLogItemType.work
      );
    }

    const newItem: IWorklog = {
      id: null,
      description: '',
      enableEditDescription: false,
      synergyDetail: this.newWorklog.synergyDetail,
      workLogItemType: this.newWorklog.workLogItemType,
      workLogItemClass: this.newWorklog.workLogItemClass,
      level: this.newWorklog.level
    };

    if (this.newWorklog.workLogItemType === this.workLogItemType.workItem) {
      newItem.workItem = this.newWorklog.workItem;
    } else if (
      this.newWorklog.workLogItemType === this.workLogItemType.internalCategory
    ) {
      newItem.internalCategoryId = this.newWorklog.internalCategoryId;
      newItem.internalCategoryName = this.newWorklog.internalCategoryName;
    } else {
      newItem.work = this.newWorklog.searchText;
    }

    if (this.categoryList.length) {
      newItem.categoryId = this.newWorklog.categoryId;
      if (this.categoryListObj[this.newWorklog.categoryId]) {
        newItem.categoryName = this.categoryListObj[this.newWorklog.categoryId]
          ? this.categoryListObj[this.newWorklog.categoryId].name
          : null;
        newItem.categoryColorClass = this.categoryListObj[
          this.newWorklog.categoryId
        ]
          ? this.categoryListObj[this.newWorklog.categoryId].colorClass
          : null;
      }
    }
    newItem.totalSpent = 0;

    newItem.workLogDetails = cloneObject(this.calendarNavigationDetails.days);
    this.workLogListDetails.list.unshift(newItem);
    for (const day of this.calendarNavigationDetails.days) {
      this.calculateTotalSpentWeekDayWise(day.weekDay, false);
    }
    this.convertTotalSpentForWeekDaysInArray();
    this.resetAddNewWorkLog();
  }

  resetNewWorkLogObj() {
    this.newWorklog = {
      work: '',
      categoryId: null,
      categoryName: null,
      synergyDetail: {}
    };

    this.quickAddForm.resetForm();
    this.logWorkPanelData.showAddLayout = false;
  }

  resetLogWorkSearchPanel() {
    this.logWorkPanelData.showLogWorkPanel = false;
    this.logWorkPanelData.selectedListType = this.workLogSearchListTypeConstants.workItems;
    this.resetWorkItemSearchDetails();
    this.resetInternalCategorySearchDetails();
  }

  resetWorkItemSearchDetails() {
    this.logWorkPanelData.workItemSearchDetails = {
      list: [],
      page: 1,
      pagesize: 10,
      isLoading: false,
      isLoadMore: true
    };
  }

  resetInternalCategorySearchDetails() {
    this.logWorkPanelData.internalCategorySearchDetails = {
      list: [],
      isLoading: false
    };
  }

  resetAddNewWorkLog() {
    this.resetNewWorkLogObj();
    this.resetLogWorkSearchPanel();
  }

  setSelectedLevel(tree: any, level: any) {
    if (tree && level && level.id) {
      const node = tree.treeModel.getNodeById(level.id);
      if (node) {
        node.setActiveAndVisible();
      }
    }
  }

  onSelectCategory(worklog: any, category: any) {
    worklog.categoryId = category.id;
    worklog.categoryName = category.name;
    worklog.categoryColorClass = category.colorClass;
  }

  onSelectLevel(worklog: any, dropdown: any, levelNode: any) {
    if (levelNode) {
      if (levelNode.isLeaf && !levelNode.isRoot) {
        worklog.level = levelNode.data;
        dropdown.close();
      } else {
        levelNode.toggleExpanded();
      }
    }
  }

  onSelectProject(worklog: any, project: any) {
    worklog.synergyDetail.project = project;
    worklog.synergyDetail.activity = {};
    this.resetActivitiesDetails();
  }

  onSelectActivity(worklog: any, activity: any) {
    worklog.synergyDetail.activity = activity;
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
      this.calculateTotalSpentWeekDayWise(workDay.weekDay, false);
    }
    this.convertTotalSpentForWeekDaysInArray();
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

  validateDayLogTimeLimit(worklog: any, work: any) {
    this.restoreValue(work);
    this.calculateTotalSpentWeekDayWise(work.weekDay, false);
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
    this.calculateTotalSpentWeekDayWise(work.weekDay, true);
  }

  calculateTotalSpentWeekDayWise(weekDay: any, calculateFinalArray: boolean) {
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

  validateTimesheet(isSubmit) {
    this.workLogListDetails.message = null;
    this.isSheetSaved = true;
    if (isSubmit) {
      this.isSheetSubmitted = true;
    }
    const params: any = {};
    params.id = this.timesheetDetails ? this.timesheetDetails.id : '';
    params.startDate = this.calendarNavigationDetails.startDate;
    params.endDate = this.calendarNavigationDetails.endDate;
    params.regionId = this._userService.userDetails.userRegion.id;
    params.isSubmit = isSubmit;
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

      if (isSubmit) {
        if (
          this.thirdPartyConfigurationStatus.configured ===
          this._userService.userDetails.thirdPartyConfigurationStatus
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

    if (isSubmit) {
      this.submitTimesheet(params);
    } else {
      this.saveTimesheet(params);
    }
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
        this.saveTimesheet(params);
      }
    });
  }

  saveTimesheet(params: any) {
    this._spinnerService.startSpinner();
    this._timesheetService
      .saveTimesheet(params)
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

  onDeleteWorklogConfirmationResponse(response, worklog, index) {
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
      .delete(params)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
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

  loadWorkItemData() {
    if (
      this.logWorkPanelData.workItemSearchDetails.list.length &&
      this.logWorkPanelData.workItemSearchDetails.isLoadMore
    ) {
      this.logWorkPanelData.workItemSearchDetails.page++;
      this.getWorkItemsList();
    }
  }

  onFocusLogWorkInput() {
    if (!this.logWorkPanelData.showLogWorkPanel) {
      this.getLogWorkSearchList(this.logWorkPanelData.selectedListType);
    }
    this.logWorkPanelData.showAddLayout = true;
    setTimeout(() => {
      this.logWorkPanelData.logPanelWidth =
        this.logWorkInputField.nativeElement.clientWidth + 'px';
      this.logWorkPanelData.showLogWorkPanel = true;
    });
  }

  onLogWorkSearchTabSelection(type: string) {
    if (this.logWorkPanelData.selectedListType === type) {
      return;
    }
    this.getLogWorkSearchList(type);
  }

  onWorkItemSearchTextChange(type: string) {
    if (
      !this.logWorkPanelData.showLogWorkPanel ||
      this.logWorkPanelData.selectedListType !==
        this.workLogSearchListTypeConstants.workItems
    ) {
      return;
    }
    if (this.workItemSearchTimer) {
      clearTimeout(this.workItemSearchTimer);
    }
    this.workItemSearchTimer = setTimeout(() => {
      this.resetWorkItemSearchDetails();
      this.getWorkItemsList();
    }, 1000);
  }

  getLogWorkSearchList(type: string) {
    this.resetWorkItemSearchDetails();
    this.resetInternalCategorySearchDetails();
    this.logWorkPanelData.selectedListType = type;
    if (
      this.logWorkPanelData.selectedListType ===
      this.workLogSearchListTypeConstants.workItems
    ) {
      this.getWorkItemsList();
    } else if (
      this.logWorkPanelData.selectedListType ===
      this.workLogSearchListTypeConstants.internal
    ) {
      this.getInternalCategory();
    }
  }

  getWorkItemsList() {
    const queryParams: any = {};
    queryParams.searchText = this.newWorklog.searchText || '';
    queryParams.page = this.logWorkPanelData.workItemSearchDetails.page;
    queryParams.pagesize = this.logWorkPanelData.workItemSearchDetails.pagesize;

    this.logWorkPanelData.workItemSearchDetails.isLoading = true;
    this._workItemService
      .get(queryParams)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this.logWorkPanelData.workItemSearchDetails.isLoading = false;
          response.forEach(element => {
            element.workLogItemClass = getWorklogClass(
              this.workLogItemType.workItem,
              element.workItemType
            );
          });
          if (
            response.length <
            this.logWorkPanelData.workItemSearchDetails.pagesize
          ) {
            this.logWorkPanelData.workItemSearchDetails.isLoadMore = false;
          }
          this.logWorkPanelData.workItemSearchDetails.list.push(...response);
        },
        error => {
          this.logWorkPanelData.workItemSearchDetails.isLoading = false;
          this._utilService.handleError(error);
        }
      );
  }

  getInternalCategory() {
    this.logWorkPanelData.internalCategorySearchDetails.isLoading = true;
    this._internalCategoryService
      .get(this._userService.userDetails.userRegion.id)
      .takeWhile(() => this.alive)
      .subscribe(
        response => {
          this.logWorkPanelData.internalCategorySearchDetails.isLoading = false;
          for (const internalCategory of response) {
            internalCategory.workLogItemClass = getWorklogClass(
              this.workLogItemType.internalCategory
            );
            internalCategory.categoryName = null;
            if (this.categoryListObj[internalCategory.categoryId]) {
              const category = this.categoryListObj[
                internalCategory.categoryId
              ];
              internalCategory.categoryName = category.name;
              internalCategory.categoryColorClass = category.colorClass;
            }
          }
          this.logWorkPanelData.internalCategorySearchDetails.list = response;
        },
        error => {
          this.logWorkPanelData.internalCategorySearchDetails.isLoading = false;
          this._utilService.handleError(error);
        }
      );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.logWorkInputField) {
      this.logWorkPanelData.logPanelWidth =
        this.logWorkInputField.nativeElement.clientWidth + 'px';
    }
  }

  filterWorkItemByTitle(item: any, value: any) {
    if (!value) {
      return true;
    }
    return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
  }

  filterInternalCategoryByName(item: any, value: any) {
    if (!value) {
      return true;
    }
    return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
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

  toggleDescriptionPopover(popover: any, worklog: any) {
    setTimeout(() => {
      worklog.tempDescription = worklog.description;
      if (worklog.description) {
        worklog.enableEditDescription = false;
      } else {
        worklog.enableEditDescription = true;
      }
      popover.toggle();
    });
  }

  clickOutsideDescriptionPopover(event, popover, index) {
    if (
      event.getAttribute('data-popovername') ===
      'descriptionPopover' + index
    ) {
      return;
    }
    popover.close();
  }

  closeDescriptionPopover(popover: any) {
    popover.close();
  }

  saveDescriptionPopover(popover: any, worklog: any) {
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

  ngOnDestroy() {
    this.alive = false;
    if (this.workItemSearchTimer) {
      clearTimeout(this.workItemSearchTimer);
    }
    if (this.validationTimer) {
      clearTimeout(this.validationTimer);
    }
  }
}
