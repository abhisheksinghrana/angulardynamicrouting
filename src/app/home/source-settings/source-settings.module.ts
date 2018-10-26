import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { SourceSettingsRoutingModule } from './source-settings-routing.module';

import { SourceSettingsComponent } from './source-settings.component';

@NgModule({
  imports: [SharedModule, SourceSettingsRoutingModule],
  declarations: [SourceSettingsComponent]
})
export class SourceSettingsModule {}
