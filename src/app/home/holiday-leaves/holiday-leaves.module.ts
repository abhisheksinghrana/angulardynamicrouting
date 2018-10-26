import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { HolidayLeavesRoutingModule } from './holiday-leaves-routing.module';

import { HolidayLeavesComponent } from './holiday-leaves.component';
import { HolidayService } from './services/holiday.service';
@NgModule({
  imports: [SharedModule, HolidayLeavesRoutingModule],
  declarations: [HolidayLeavesComponent],
  providers: [HolidayService]
})
export class HolidayLeavesModule {}
