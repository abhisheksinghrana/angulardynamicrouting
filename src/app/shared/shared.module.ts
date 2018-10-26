import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectModule } from 'ng2-select';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FeedbackServiceComponent } from './components/feedback-service/feedback-service.component';
import { ConfirmationBarComponent } from './components/confirmation-bar/confirmation-bar.component';
import { NotificationComponent } from './components/notification/notification.component';

import { AppService } from './services/app.service';
import { WindowRefService } from './services/window-ref.service';
import { UtilService } from './services/util.service';
import { NotificationService } from './services/notification.service';
import { GeneralSettingsService } from './services/general-settings.service';
import { RouteGeneratorService } from './services/route-generator.service';

import { OnlyNumberDirective } from './directives/only-number.directive';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SelectModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SelectModule,
    SpinnerComponent,
    NavbarComponent,
    FeedbackServiceComponent,
    ConfirmationBarComponent,
    NotificationComponent,
    OnlyNumberDirective,
    ToggleButtonComponent
  ],
  declarations: [
    SpinnerComponent,
    NavbarComponent,
    FeedbackServiceComponent,
    ConfirmationBarComponent,
    NotificationComponent,
    OnlyNumberDirective,
    ToggleButtonComponent
  ],
  providers: [
    AppService,
    WindowRefService,
    UtilService,
    NotificationService,
    GeneralSettingsService,
    RouteGeneratorService
  ],
  entryComponents: [NotificationComponent]
})
export class SharedModule {}
