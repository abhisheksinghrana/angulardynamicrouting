import { DaterangepickerConfig } from 'ng2-daterangepicker';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';

// import { LocaleService } from '../../../coreModule/services/locale.service';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
  isCalendarOpen: Boolean;

  @Input()
  defaultDate: any;

  @Output()
  dateRangeSelected: EventEmitter<any> = new EventEmitter<any>();

  public dateRange: any = {
    startDate: moment().subtract(1, 'weeks'),
    endDate: moment().subtract(0, 'weeks')
  };

  public singleDate: any;

  constructor(private daterangepickerOptions: DaterangepickerConfig) {
    const lastWeek = 'Last Week',
      lastMonth = 'Last Month',
      lastQuarter = 'Last Quarter';
    const range = {};
    range[lastWeek] = [moment().subtract(1, 'weeks'), moment()];
    range[lastMonth] = [moment().subtract(1, 'month'), moment()];
    range[lastQuarter] = [moment().subtract(4, 'month'), moment()];

    this.daterangepickerOptions.settings = {
      locale: {
        format: 'DD MMMM YYYY',
        applyLabel: 'Apply',
        cancelLabel: 'Cancel',
        customRangeLabel: 'Custom Range'
      },
      alwaysShowCalendars: true,
      linkedCalendars: false,
      startDate: moment().subtract(1, 'weeks'),
      endDate: moment().subtract(0, 'weeks'),
      ranges: range,
      applyClass: 'common-button',
      cancelClass: 'cancel-button common-button',
      maxDate: moment()
    };
    this.isCalendarOpen = false;
    this.singleDate = Date.now();
  }

  ngOnInit() {
    if (
      this.defaultDate &&
      this.defaultDate.startDate &&
      this.defaultDate.endDate
    ) {
      this.dateRange = Object.assign(this.dateRange, {
        startDate: moment(this.defaultDate.startDate, 'DD/MM/YYYY'),
        endDate: moment(this.defaultDate.endDate, 'DD/MM/YYYY')
      });
      this.daterangepickerOptions.settings = Object.assign(
        this.daterangepickerOptions.settings,
        this.dateRange
      );
    }
    this.dateRangeSelected.emit(this.dateRange);
  }

  public selectedDate(value: any, datepicker?: any) {
    this.dateRange.startDate = value.start;
    this.dateRange.endDate = value.end;
    this.dateRange.label = value.label;
  }

  private singleSelect(value: any) {
    this.singleDate = value.start;
  }

  public calendarEventsHandler({ event }) {
    if (event.type === 'apply') {
      this.dateRangeSelected.emit(this.dateRange);
    }
  }
}
