import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { SourceRoutingModule } from './source-routing.module';

import { SourceComponent } from './source.component';

@NgModule({
  imports: [SharedModule, SourceRoutingModule],
  declarations: [SourceComponent]
})
export class SourceModule {}
