import { Component, OnInit, Input } from '@angular/core';

import { WorkLogItemType } from '../../../shared/enums/work-log-item-type.enum';

import { getWorklogClass } from '../../../shared/helper-functions/worklog-util';

@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.scss']
})
export class WorkItemComponent implements OnInit {
  @Input() worklogDetails: any;
  @Input() level: number | string;

  workLogItemType: typeof WorkLogItemType;

  constructor() {
    this.workLogItemType = WorkLogItemType;
  }

  ngOnInit() {
    if (this.worklogDetails.workLogItemType === this.workLogItemType.workItem) {
      this.worklogDetails.workLogItemClass = getWorklogClass(
        this.worklogDetails.workLogItemType,
        this.worklogDetails.workItem.workItemType
      );
    } else {
      this.worklogDetails.workLogItemClass = getWorklogClass(
        this.worklogDetails.workLogItemType
      );
    }
  }
}
