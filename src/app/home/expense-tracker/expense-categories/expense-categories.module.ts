import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { ExpenseCategoriesRoutingModule } from './expense-categories-routing.module';
import { ExpenseCategoriesComponent } from './expense-categories.component';

@NgModule({
  imports: [SharedModule, ExpenseCategoriesRoutingModule],
  declarations: [ExpenseCategoriesComponent]
})
export class ExpenseCategoriesModule {}
