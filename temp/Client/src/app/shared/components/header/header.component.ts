import { Component, OnInit } from '@angular/core';

import { TeamReportAccessGuard } from '../../guards/team-report-access.guard';
import { ManageTimesheetGuard } from '../../guards/manage-timesheet.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuTabList: any[];

  constructor(
    private _teamReportAccessGuard: TeamReportAccessGuard,
    private _manageTimesheetGuard: ManageTimesheetGuard
  ) {
    this.menuTabList = [
      {
        name: 'Personal hours',
        route: '/timesheet',
        show: true
      },
      {
        name: 'Team hours',
        route: '/teamreport',
        show: this._teamReportAccessGuard.isReportTabAllowed()
      },
      {
        name: 'Manage timesheets',
        route: '/managetimesheets',
        show: this._manageTimesheetGuard.isManageTimesheetAllowed()
      },
      {
        name: 'Reports',
        route: '/reports',
        show: true
      }
    ];
  }

  ngOnInit() {}
}
