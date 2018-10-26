import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ExpenseTrackerRoutingModule } from './expense-tracker-routing.module';

import { ExpenseTrackerComponent } from './expense-tracker.component';

@NgModule({
  imports: [SharedModule, ExpenseTrackerRoutingModule],
  declarations: [ExpenseTrackerComponent]
})
export class ExpenseTrackerModule {}
