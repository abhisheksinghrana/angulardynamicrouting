import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { TeamReportRoutingModule } from './team-report-routing.module';

import { TeamReportComponent } from './team-report.component';

import { TeamReportService } from './team-report.service';

@NgModule({
  imports: [CommonModule, TeamReportRoutingModule, SharedModule],
  declarations: [TeamReportComponent],
  providers: [TeamReportService]
})
export class TeamReportModule {}
