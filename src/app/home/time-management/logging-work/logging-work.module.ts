import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { LoggingWorkRoutingModule } from './logging-work-routing.module';

import { LoggingWorkComponent } from './logging-work.component';

@NgModule({
  imports: [SharedModule, LoggingWorkRoutingModule],
  declarations: [LoggingWorkComponent]
})
export class LoggingWorkModule {}
