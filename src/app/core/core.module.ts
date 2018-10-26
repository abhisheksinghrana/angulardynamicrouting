import { NgModule, Optional, SkipSelf } from '@angular/core';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { UserService } from './services/user.service';
import { NavigationService } from './services/navigation.service';
import { SpinnerService } from './services/spinner.service';
import { MenuLinksGeneratorService } from './services/menu-links-generator.service';
import { RegionService } from './services/region.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    UserService,
    NavigationService,
    SpinnerService,
    MenuLinksGeneratorService,
    RegionService
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
