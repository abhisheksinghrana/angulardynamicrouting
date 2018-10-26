import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { TimeCategoriesRoutingModule } from './time-categories-routing.module';

import { TimeCategoriesComponent } from './time-categories.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  imports: [SharedModule, TimeCategoriesRoutingModule],
  declarations: [TimeCategoriesComponent, CategoryListComponent]
})
export class TimeCategoriesModule {}
