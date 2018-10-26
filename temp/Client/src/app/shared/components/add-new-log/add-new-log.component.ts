import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { WorkLogItemType } from '../../enums/work-log-item-type.enum';

import { UserService } from '../../../core/services/user.service';
import { UtilService } from '../../services/util.service';
import { InternalCategoryService } from '../../services/internal-category.service';
import { WorkItemService } from '../../services/work-item.service';

import { cloneObject } from '../../helper-functions/util';
import { getWorklogClass } from '../../helper-functions/worklog-util';
import { IWorklog } from '../../models/worklog';

import { WorkLogSearchListTypeConstants } from '../../constants/worklog-search-list-type.constants';
import { ThirdPartyConfigurationStatus } from '../../enums/third-party-configuration-status.enum';
import { IAccountRegionSetting } from '../../models/account-region-setting';

@Component({
  selector: 'app-add-new-log',
  templateUrl: './add-new-log.component.html',
  styleUrls: ['./add-new-log.component.scss']
})
export class AddNewLogComponent implements OnInit, OnDestroy {
  @Input()
  workLogListDetails: any;
  @Input()
  userSearchPanelDetails: any;
  @Input()
  accountRegionSetting: IAccountRegionSetting;
  @Input()
  projectList: any[];
  @Input()
  activityDetails: any;
  @Input()
  organizationLevelList: any[];
  @Input()
  categoryList: any[];
  @Input()
  categoryListObj: any;
  @Input()
  calendarNavigationDetails: any;

  @Output()
  triggerCalculateTotalSpentWeekDayWise: EventEmitter<any> = new EventEmitter<
    any
  >();
  @Output()
  triggerConvertTotalSpentForWeekDaysInArray: EventEmitter<
    any
  > = new EventEmitter<any>();
  @Output()
  getBillableActivities: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  getNonBillableActivities: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  resetActivitiesDetails: EventEmitter<any> = new EventEmitter<any>();

  alive: boolean;

  workLogSearchListTypeConstants: typeof WorkLogSearchListTypeConstants;
  thirdPartyConfigurationStatus: typeof ThirdPartyConfigurationStatus;

  @ViewChild('logWorkInputField')
  logWorkInputField: ElementRef;
  @ViewChild('quickAddForm')
  quickAddForm: any;

  workLogItemType: typeof WorkLogItemType;
  newWorklog: any;
  logWorkPanelData: any;
  selectedWorkItemFromPanel: any;

  workItemSearchTimer: any;

  constructor(
    public _userService: UserService,
    private _utilService: UtilService,
    private _internalCategoryService: InternalCategoryService,
    private _workItemService: WorkItemService
  ) {
    this.alive = true;
    this.workLogSearchListTypeConstants = WorkLogSearchListTypeConstants;
    this.thirdPartyConfigurationStatus = ThirdPartyConfigurationStatus;
    this.workLogItemType = WorkLogItemType;

    this.newWorklog = {
      synergyDetail: {}
    };
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
    this.selectedWorkItemFromPanel = {};
  }

  ngOnInit() {}

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
      this.triggerCalculateTotalSpentWeekDayWise.emit({
        weekDay: day.weekDay,
        calculateFinalArray: false
      });
    }
    this.triggerConvertTotalSpentForWeekDaysInArray.emit();
    this.resetAddNewWorkLog();
  }

  resetAddNewWorkLog() {
    this.resetNewWorkLogObj();
    this.resetLogWorkSearchPanel();
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
    if (this.userSearchPanelDetails.selectedUserDetail.id) {
      queryParams.userId = this.userSearchPanelDetails.selectedUserDetail.id;
    }

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
      .get(
        this.userSearchPanelDetails.regionId,
        this.userSearchPanelDetails.selectedUserDetail.id
      )
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

  onSelectProject(worklog: any, project: any) {
    worklog.synergyDetail.project = project;
    worklog.synergyDetail.activity = {};
    this.resetActivities();
  }

  getActivities(project: any) {
    this.resetActivities();
    if (project && project.code) {
      if (project.isBillable) {
        this.getBillableActivities.emit(project.code);
      } else {
        this.getNonBillableActivities.emit(project.code);
      }
    }
  }

  onSelectActivity(worklog: any, activity: any) {
    worklog.synergyDetail.activity = activity;
  }

  resetActivities() {
    this.resetActivitiesDetails.emit();
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

  ngOnDestroy() {
    this.alive = false;
    if (this.workItemSearchTimer) {
      clearTimeout(this.workItemSearchTimer);
    }
  }
}
