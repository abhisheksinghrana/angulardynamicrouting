import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { UserService } from './services/user.service';
import { NavigationService } from './services/navigation.service';
import { SpinnerService } from './services/spinner.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [UserService, NavigationService, SpinnerService]
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
