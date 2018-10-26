import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { LeaveCategoriesRoutingModule } from './leave-categories-routing.module';

import { LeaveCategoriesComponent } from './leave-categories.component';

@NgModule({
  imports: [SharedModule, LeaveCategoriesRoutingModule],
  declarations: [LeaveCategoriesComponent]
})
export class LeaveCategoriesModule {}
