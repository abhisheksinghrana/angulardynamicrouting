import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  SimpleChanges
} from '@angular/core';

import { IUserSearch } from '../../models/user-search';

@Component({
  selector: 'app-group-preferences',
  templateUrl: './group-preferences.component.html',
  styleUrls: ['./group-preferences.component.scss']
})
export class GroupPreferencesComponent implements OnInit, OnChanges, OnDestroy {
  @Output() getGroupByPreferenceListEmitter = new EventEmitter<any>();
  @Output() updateGroupByPreferenceListEmitter = new EventEmitter<any>();
  @Input() activeGroupByList: any[];
  @Input() inactiveGroupByList: any[];

  constructor() {
    this.activeGroupByList = [];
    this.inactiveGroupByList = [];
  }

  ngOnInit() {
    this.getGroupByPreferenceList();
  }

  getGroupByPreferenceList() {
    this.getGroupByPreferenceListEmitter.emit();
  }

  updateGroupByPreferenceList() {
    this.updateGroupByPreferenceListEmitter.emit(this.activeGroupByList);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['activeGroupByList'] &&
      changes['activeGroupByList'].currentValue
    ) {
      this.activeGroupByList = changes['activeGroupByList'].currentValue;
    }
    if (
      changes['inactiveGroupByList'] &&
      changes['inactiveGroupByList'].currentValue
    ) {
      this.inactiveGroupByList = changes['inactiveGroupByList'].currentValue;
    }
  }

  addGroupBy(item, index) {
    if (item.isActive) {
      this.inactiveGroupByList.splice(index, 1);
      this.activeGroupByList.push(item);
      this.updateGroupByPreferenceList();
    }
  }

  removeGroupBy(item, index) {
    if (!item.isActive) {
      this.activeGroupByList.splice(index, 1);
      this.inactiveGroupByList.push(item);
      this.updateGroupByPreferenceList();
    }
  }

  moveDown(index) {
    [this.activeGroupByList[index], this.activeGroupByList[index + 1]] = [
      this.activeGroupByList[index + 1],
      this.activeGroupByList[index]
    ];
    this.updateGroupByPreferenceList();
  }

  moveUp(index) {
    [this.activeGroupByList[index], this.activeGroupByList[index - 1]] = [
      this.activeGroupByList[index - 1],
      this.activeGroupByList[index]
    ];
    this.updateGroupByPreferenceList();
  }

  trackByFn(index, item) {
    return item.id;
  }

  ngOnDestroy() {}
}
