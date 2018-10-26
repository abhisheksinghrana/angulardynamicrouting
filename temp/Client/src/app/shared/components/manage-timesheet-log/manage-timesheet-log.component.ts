import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserService } from '../../../core/services/user.service';
import { ThirdPartyConfigurationStatus } from '../../enums/third-party-configuration-status.enum';
import { WorkLogItemType } from '../../enums/work-log-item-type.enum';
import { IAccountRegionSetting } from '../../models/account-region-setting';

@Component({
  selector: 'app-manage-timesheet-log',
  templateUrl: './manage-timesheet-log.component.html',
  styleUrls: ['./manage-timesheet-log.component.scss']
})
export class ManageTimesheetLogComponent implements OnInit {
  @Input()
  worklog: any;
  @Input()
  index: number;
  @Input()
  isTimesheetFreezed: boolean;
  @Input()
  isSheetSubmitted: boolean;
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

  @Output()
  saveDescription: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  getBillableActivities: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  getNonBillableActivities: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  resetActivitiesDetails: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  updateCurrentlySelectedValue: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  triggerValidateDayLogTimeLimit: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  triggerOnDeleteConfirmation: EventEmitter<any> = new EventEmitter<any>();

  thirdPartyConfigurationStatus: typeof ThirdPartyConfigurationStatus;
  workLogItemType: typeof WorkLogItemType;

  constructor(public _userService: UserService) {
    this.thirdPartyConfigurationStatus = ThirdPartyConfigurationStatus;
    this.workLogItemType = WorkLogItemType;
  }

  ngOnInit() {}

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

  closeDescriptionPopover(popover: any) {
    popover.close();
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

  saveDescriptionPopover(popover: any, worklog: any) {
    this.saveDescription.emit({ popover, worklog });
  }

  updateCurrentlySelectedHourValue(value: number) {
    this.updateCurrentlySelectedValue.emit(value);
  }

  validateDayLogTimeLimit(worklog: any, work: any) {
    this.triggerValidateDayLogTimeLimit.emit({ worklog, work });
  }

  onDeleteConfirmation($event, worklog, index) {
    this.triggerOnDeleteConfirmation.emit({ response: $event, worklog, index });
  }
}
