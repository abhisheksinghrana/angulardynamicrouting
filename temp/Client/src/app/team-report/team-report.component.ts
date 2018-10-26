import { Component, OnInit } from '@angular/core';

import { TeamReportService } from './team-report.service';
import { CalendarNavigationService } from '../shared/services/calendar-navigation.service';
import { OrganizationService } from '../shared/services/organization.service';
import { UserService } from '../core/services/user.service';
import { SpinnerService } from '../core/services/spinner.service';
import { UtilService } from '../shared/services/util.service';

import { WeekActionType } from '../shared/enums/week-action-type.enum';

import { formatFloat } from '../shared/helper-functions/util';

@Component({
  selector: 'app-team-report',
  templateUrl: './team-report.component.html',
  styleUrls: ['./team-report.component.scss']
})
export class TeamReportComponent implements OnInit {
  calendarNavigationDetails: any;
  squadList: any[];
  teamWorklog: any;

  selectedTeamId: any;

  timesheetSummary: any;
  weekActionType: typeof WeekActionType;
  hourCellWidth: number;

  constructor(
    private _teamReportService: TeamReportService,
    private _calendarNavigationService: CalendarNavigationService,
    private _organizationService: OrganizationService,
    private _userService: UserService,
    private _spinnerService: SpinnerService,
    private _utilService: UtilService
  ) {
    this.calendarNavigationDetails = {};
    this.squadList = [];
    this.teamWorklog = {};

    this.selectedTeamId = '';

    this.timesheetSummary = {};
    this.weekActionType = WeekActionType;
    this.hourCellWidth = 0;
  }

  ngOnInit() {
    this.getCalendarNavigation(true);
  }

  // getSquad(invokeCalendarNavigation) {
  //   this._spinnerService.startSpinner();
  //   this._organizationService.getSquad().subscribe(
  //     response => {
  //       this._spinnerService.stopSpinner();
  //       this.squadList = response;
  //       this.selectedTeamId = this.squadList.length ? this.squadList[0].id : '';
  //       if (invokeCalendarNavigation) {
  //         this.getCalendarNavigation(true);
  //       } else {
  //         this.fetchTeamWorklog();
  //       }
  //     },
  //     error => {
  //       this._spinnerService.stopSpinner();
  //       this._utilService.handleError(error);
  //     }
  //   );
  // }

  getCalendarNavigation(
    isAllowed: boolean,
    actionType?: number,
    startDate?: string
  ) {
    if (!isAllowed) {
      return;
    }
    this._spinnerService.startSpinner();
    this._calendarNavigationService
      .getCalendarNavigationDetails(actionType, startDate)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          this.hourCellWidth = 100 / response.days.length;
          this.calendarNavigationDetails = response;
          this.fetchTeamWorklog();
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  fetchTeamWorklog() {
    if (this._userService.userDetails.organizationLevelId) {
      this.getTeamWorklog(
        this._userService.userDetails.organizationLevelId,
        this.calendarNavigationDetails.startDate,
        this.calendarNavigationDetails.endDate
      );
    }
  }

  getTeamWorklog(teamId: string, startDate: string, endDate: string) {
    this._spinnerService.startSpinner();
    this._teamReportService
      .getTeamWorklog(teamId, startDate, endDate)
      .subscribe(
        response => {
          this._spinnerService.stopSpinner();
          this.teamWorklog = response;
          this.getTimesheetSummary();
        },
        error => {
          this._spinnerService.stopSpinner();
          this._utilService.handleError(error);
        }
      );
  }

  getTimesheetSummary() {
    this.resetTimesheet();
    for (const workLog of this.teamWorklog.teamWorkLogDetails) {
      this.timesheetSummary.totalLeaves += formatFloat(
        workLog.leave ? workLog.leave.count : 0
      );
      this.timesheetSummary.leaveUnit = workLog.leave ? workLog.leave.unit : '';
      this.timesheetSummary.totalBillableLogged += formatFloat(
        workLog.billable
      );
      this.timesheetSummary.totalBackup += formatFloat(workLog.backup);
      this.timesheetSummary.totalNonBillable += formatFloat(
        workLog.nonBillable
      );
      this.timesheetSummary.totalOvertime += formatFloat(workLog.overtime);
    }
  }

  resetTimesheet() {
    this.timesheetSummary.totalLeaves = 0;
    this.timesheetSummary.leaveUnit = '';
    this.timesheetSummary.totalBillableLogged = 0;
    this.timesheetSummary.totalBackup = 0;
    this.timesheetSummary.totalNonBillable = 0;
    this.timesheetSummary.totalOvertime = 0;
  }
}
