import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { HeaderComponent } from '../shared/components/header/header.component';

import { TeamReportAccessGuard } from '../shared/guards/team-report-access.guard';
import { ManageTimesheetGuard } from '../shared/guards/manage-timesheet.guard';

@NgModule({
  imports: [CommonModule, HomeRoutingModule],
  declarations: [HomeComponent, HeaderComponent],
  providers: [TeamReportAccessGuard, ManageTimesheetGuard]
})
export class HomeModule {}
