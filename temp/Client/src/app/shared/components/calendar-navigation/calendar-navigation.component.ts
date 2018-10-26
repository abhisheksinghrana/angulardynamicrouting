import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeekActionType } from '../../enums/week-action-type.enum';

@Component({
  selector: 'app-calendar-navigation',
  templateUrl: './calendar-navigation.component.html',
  styleUrls: ['./calendar-navigation.component.scss']
})
export class CalendarNavigationComponent implements OnInit {
  @Input()
  details: any;
  @Input()
  disabled: boolean;
  @Output()
  fetch: EventEmitter<any> = new EventEmitter<any>();
  weekActionType: typeof WeekActionType;

  constructor() {
    this.weekActionType = WeekActionType;
  }

  ngOnInit() {}

  handleClick(
    isAllowed: boolean,
    actionType?: WeekActionType,
    startDate?: string
  ): void {
    if (this.disabled) {
      return;
    }
    this.fetch.emit({ isAllowed, actionType, startDate });
  }
}
