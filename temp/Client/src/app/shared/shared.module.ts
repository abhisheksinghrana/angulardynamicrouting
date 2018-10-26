import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { TreeModule } from 'angular-tree-component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FeedbackServiceComponent } from './components/feedback-service/feedback-service.component';
import { ConfirmationBarComponent } from './components/confirmation-bar/confirmation-bar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NoRecordFoundComponent } from './components/no-record-found/no-record-found.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { GroupPreferencesComponent } from './components/group-preferences/group-preferences.component';
import { DateRangeComponent } from './components/date-range/date-range.component';
import { CalendarNavigationComponent } from './components/calendar-navigation/calendar-navigation.component';
import { ManageTimesheetLogComponent } from './components/manage-timesheet-log/manage-timesheet-log.component';
import { AddNewLogComponent } from './components/add-new-log/add-new-log.component';

import { AppService } from './services/app.service';
import { WindowRefService } from './services/window-ref.service';
import { CalendarNavigationService } from './services/calendar-navigation.service';
import { AccountRegionSettingService } from './services/account-region-setting.service';
import { ThirdPartyConfigurationService } from './services/third-party-configuration.service';
import { TimesheetService } from './services/timesheet.service';
import { CategoryService } from './services/category.service';
import { InternalCategoryService } from './services/internal-category.service';
import { GroupByPreferencesService } from './services/group-by-preferences.service';
import { ProjectService } from './services/project.service';
import { RequestTypeService } from './services/request-type.service';
import { BillableActivitiesService } from './services/billable-activities.service';
import { NonBillableActivitiesService } from './services/non-billable-activities.service';
import { WorklogService } from './services/worklog.service';
import { OrganizationService } from './services/organization.service';
import { WorkItemService } from './services/work-item.service';
import { EmployeeTimesheetService } from './services/employee-timesheet.service';
import { UtilService } from './services/util.service';
import { NotificationService } from './services/notification.service';
import { SubmitTimesheetComponent } from '../timesheet/modals/submit-timesheet/submit-timesheet.component';

import { CustomScrollDirective } from './directives/custom-scroll.directive';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { DropdownPositionDirective } from './directives/dropdown-position.directive';

import { ArrayFilterPipe } from './pipes/array-filter.pipe';

const imports = [
  CommonModule,
  FormsModule,
  NgbModule,
  PerfectScrollbarModule,
  Daterangepicker,
  TreeModule
];

const components = [
  SpinnerComponent,
  NavbarComponent,
  FeedbackServiceComponent,
  ConfirmationBarComponent,
  NoRecordFoundComponent,
  UserSearchComponent,
  GroupPreferencesComponent,
  DateRangeComponent,
  CalendarNavigationComponent,
  ManageTimesheetLogComponent,
  AddNewLogComponent
];

const directives = [
  CustomScrollDirective,
  OnlyNumberDirective,
  AutofocusDirective,
  ClickOutsideDirective,
  DropdownPositionDirective
];
const entryComponents = [NotificationComponent, SubmitTimesheetComponent];

const pipes = [ArrayFilterPipe];

const services = [
  AppService,
  WindowRefService,
  CalendarNavigationService,
  AccountRegionSettingService,
  ThirdPartyConfigurationService,
  TimesheetService,
  CategoryService,
  InternalCategoryService,
  GroupByPreferencesService,
  ProjectService,
  RequestTypeService,
  BillableActivitiesService,
  NonBillableActivitiesService,
  WorklogService,
  OrganizationService,
  WorkItemService,
  UtilService,
  NotificationService,
  EmployeeTimesheetService
];

@NgModule({
  imports: [...imports],
  exports: [...imports, ...components, ...directives, ...pipes],
  declarations: [...components, ...directives, ...entryComponents, ...pipes],
  providers: [...services],
  entryComponents: [...entryComponents]
})
export class SharedModule {}
