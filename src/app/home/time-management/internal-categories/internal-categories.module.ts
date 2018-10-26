import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { InternalCategoriesRoutingModule } from './internal-categories-routing.module';

import { InternalCategoriesComponent } from './internal-categories.component';
import { InternalCategoryListComponent } from './internal-category-list/internal-category-list.component';

@NgModule({
  imports: [SharedModule, InternalCategoriesRoutingModule],
  declarations: [InternalCategoriesComponent, InternalCategoryListComponent]
})
export class InternalCategoriesModule {}
