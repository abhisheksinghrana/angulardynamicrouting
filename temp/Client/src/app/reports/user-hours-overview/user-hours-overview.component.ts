import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef
} from '@angular/core';
import * as moment from 'moment';
import 'rxjs/add/operator/takeWhile';

import { EmployeeTimesheetService } from '../../shared/services/employee-timesheet.service';
import { UserService } from '../../core/services/user.service';
import { GroupByPreferencesService } from '../../shared/services/group-by-preferences.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { UtilService } from '../../shared/services/util.service';
import { OrganizationService } from '../../shared/services/organization.service';

import { IUserSearch } from '../../shared/models/user-search';

import { WeekActionType } from '../../shared/enums/week-action-type.enum';
import { ReportTypeConstants } from '../../shared/constants/report-type.constants';
import { environment } from '../../../environments/environment';

export enum UserSearchPanelType {
  user = 1,
  level
}

@Component({
  selector: 'app-user-hours-overview',
  templateUrl: './user-hours-overview.component.html',
  styleUrls: ['./user-hours-overview.component.scss']
})
export class UserHoursOverviewComponent implements OnInit, OnDestroy {
  @ViewChild('bodyScroll')
  bodyScroll: ElementRef;
  @ViewChild('headerScroll')
  headerScroll: ElementRef;

  env: any;
  alive: boolean;

  requestObject: any;
  recentUserSearchList: any[];
  userSearchList: any[];
  userSearchDefaultParams: IUserSearch;
  userSearchParams: any;

  organizationLevelList: any[];

  datepickerRange: any;

  activeGroupByList: any[];
  inactiveGroupByList: any[];
  showGroupByUserPanel: boolean;
  activeGroupByListString: string;

  worklogDetails: any;

  selectedUserDetail: any;
  selectedLevelDetail: any;
  showUserSearchPanelDetails: {
    showPanel: boolean;
    type: UserSearchPanelType;
    isLoading: boolean;
  };

  weekActionType: typeof WeekActionType;
  userSearchPanelType: typeof UserSearchPanelType;

  noRecordFoundData: any;

  constructor(
    private _employeeTimesheetService: EmployeeTimesheetService,
    private _userService: UserService,
    private _groupByPreferencesService: GroupByPreferencesService,
    private _spinnerService: SpinnerService,
    private _utilService: UtilService,
    private _organizationService: OrganizationService
  ) {
    this.env = environment;
    this.alive = true;
    this.userSearchPanelType = UserSearchPanelType;
    this.requestObject = {
      employeeId: '',
      levelId: '',
      fromDate: '',
      toDate: '',
      groupByIds: ''
    };

    this.recentUserSearchList = [];
    this.userSearchList = [];
    this.organizationLevelList = [];
    this.userSearchDefaultParams = {
      page: 0,
      pageSize: 10,
      searchText: '',
      sortBy: 'FirstName',
      orderByAscending: true,
      isExternalUser: false
    };

    this.datepickerRange = { startDate: '', endDate: '' };

    this.activeGroupByList = [];
    this.inactiveGroupByList = [];
    this.showGroupByUserPanel = false;
    this.activeGroupByListString = '';

    this.worklogDetails = {
      summary: [],
      totalSpent: 0,
      report: []
    };

    this.selectedUserDetail = null;
    this.selectedLevelDetail = null;
    this.showUserSearchPanelDetails = {
      showPanel: false,
      type: this.userSearchPanelType.user,
      isLoading: false
    };

    this.weekActionType = WeekActionType;

    this.noRecordFoundData = {
      title: 'Waiting for your input',
      description: 'Select some data and press the button to generate a report'
    };
  }

  ngOnInit() {
    this.getOrganizationLevelList();
  }

  getUserSearchDefaultParams() {
    return Object.assign({}, this.userSearchDefaultParams);
  }

  getOrganizationLevelList() {
    this._spinnerService.startSpinner();
    this._organizationService
      .getLevel()
      .takeWhile(() => this.alive)
      .subscribe(
        (response: any) => {
          this._spinnerService.stopSpinner();
          this.organizationLevelList = response.orgLevelTreeNodes;
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  getUserList(searchParams) {
    if (!searchParams.searchText) {
      this.userSearchList = [];
      return;
    }
    this._spinnerService.startSpinner();
    this._userService
      .search(searchParams)
      .takeWhile(() => this.alive)
      .subscribe(
        (response: any) => {
          this._spinnerService.stopSpinner();
          this.userSearchList = response.items;
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
          this.recentUserSearchList = response;
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
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
          (response: any) => {
            this._spinnerService.stopSpinner();
          },
          error => {
            this._spinnerService.stopSpinner();
            this._utilService.handleError(error);
          }
        );
    }
  }

  onUserSelection(item: any) {
    this.selectedUserDetail = item;
    this.requestObject.employeeId = item.id;
    this.selectedLevelDetail = null;
    this.showUserSearchPanelDetails.showPanel = false;
    this.saveUserSearch(item);
    this.getGroupByPreferenceList(
      this.requestObject.employeeId,
      ReportTypeConstants.userReport
    );
  }

  onLevelSelection(node: any) {
    if (node) {
      if (node.isLeaf && !node.isRoot) {
        this.selectedLevelDetail = node.data;
        this.requestObject.levelId = node.data.id;
        this.selectedUserDetail = null;
        this.showUserSearchPanelDetails.showPanel = false;
        this.getGroupByPreferenceList(
          this.requestObject.levelId,
          ReportTypeConstants.levelReport
        );
      } else {
        node.toggleExpanded();
      }
    }
  }

  onUserDropdownClick() {
    this.userSearchParams = this.getUserSearchDefaultParams();
    this.showUserSearchPanelDetails.showPanel = true;
  }

  onUserSearchTabSelection(type: UserSearchPanelType, tree?: any) {
    if (type !== this.showUserSearchPanelDetails.type) {
      this.showUserSearchPanelDetails.type = type;
      if (type === this.userSearchPanelType.level) {
        this.setSelectedLevel(tree, this.selectedLevelDetail);
      }
    }
  }

  setSelectedLevel(tree: any, level: any) {
    if (tree && level && level.id) {
      const node = tree.treeModel.getNodeById(level.id);
      if (node) {
        node.setActiveAndVisible();
      }
    }
  }

  resetUserPanelDetails() {
    this.showUserSearchPanelDetails = {
      showPanel: false,
      type: this.userSearchPanelType.user,
      isLoading: false
    };
  }

  resetUserSearchPanel() {
    this.showUserSearchPanelDetails.showPanel = false;
    this.recentUserSearchList = [];
    this.userSearchList = [];
  }

  getGroupByPreferenceList(searchedRecordId: string, reportType: string) {
    if (searchedRecordId) {
      this._spinnerService.startSpinner();
      this._groupByPreferencesService
        .get(reportType)
        .takeWhile(() => this.alive)
        .subscribe(
          (response: any) => {
            this._spinnerService.stopSpinner();
            this.generateGroupByDataList(response);
          },
          error => {
            this._spinnerService.stopSpinner();
            this._utilService.handleError(error);
          }
        );
    } else {
      this.activeGroupByList = [];
      this.inactiveGroupByList = [];
      this.activeGroupByListString = '';
      this.requestObject.groupByIds = '';
    }
  }

  public onScrollXAxisEvent(event: any): void {
    this.bodyScroll.nativeElement.scrollLeft = event.target.scrollLeft;
    this.headerScroll.nativeElement.scrollLeft = event.target.scrollLeft;
  }

  generateGroupByDataList(groupByPreferenceList) {
    this.activeGroupByList = [];
    this.inactiveGroupByList = [];
    for (const index in groupByPreferenceList) {
      if (groupByPreferenceList[index].isActive) {
        this.activeGroupByList.push(groupByPreferenceList[index]);
      } else {
        this.inactiveGroupByList.push(groupByPreferenceList[index]);
      }
    }
    this.generateActiveGroupsString();
  }

  generateActiveGroupsString() {
    this.activeGroupByListString = '';
    this.requestObject.groupByIds = '';
    for (let i = 0; i < this.activeGroupByList.length; i++) {
      this.activeGroupByListString +=
        this.activeGroupByList[i].fieldName +
        (Number(i) !== this.activeGroupByList.length - 1 ? ', ' : '');
      this.requestObject.groupByIds +=
        this.activeGroupByList[i].fieldId +
        (Number(i) !== this.activeGroupByList.length - 1 ? ',' : '');
    }
  }

  onGroupByUserDropdownClick() {
    this.showGroupByUserPanel = true;
  }

  resetGroupByUserPanel() {
    this.showGroupByUserPanel = false;
  }

  updateGroupByPreferenceList() {
    const params: any = {
      userGroupByPreferenceList: this.activeGroupByList
    };

    this.generateActiveGroupsString();
    this._spinnerService.startSpinner();
    this._groupByPreferencesService
      .list(params)
      .takeWhile(() => this.alive)
      .subscribe(
        (response: any) => {
          this._spinnerService.stopSpinner();
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  getUserHoursReport() {
    if (
      (!this.requestObject.employeeId && !this.requestObject.levelId) ||
      !this.requestObject.fromDate ||
      !this.requestObject.toDate
    ) {
      return;
    }

    if (!this.requestObject.employeeId) {
      this.requestObject.employeeId = '';
    }
    if (!this.requestObject.levelId) {
      this.requestObject.levelId = '';
    }
    this._spinnerService.startSpinner();
    this._employeeTimesheetService
      .getUserTimesheet(this.requestObject)
      .takeWhile(() => this.alive)
      .subscribe(
        (response: any) => {
          this._spinnerService.stopSpinner();
          this.worklogDetails = response;
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  selectedDateRange($event) {
    this.requestObject.fromDate = moment($event.startDate).format(
      'DD-MMM-YYYY'
    );
    this.requestObject.toDate = moment($event.endDate).format('DD-MMM-YYYY');
  }

  generateUserHoursReport() {
    if (
      (!this.requestObject.employeeId && !this.requestObject.levelId) ||
      !this.requestObject.fromDate ||
      !this.requestObject.toDate
    ) {
      return;
    }

    if (!this.requestObject.employeeId) {
      this.requestObject.employeeId = '';
    }
    if (!this.requestObject.levelId) {
      this.requestObject.levelId = '';
    }
    this._employeeTimesheetService.getTimesheetReport(this.requestObject);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
