import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { UserService } from './core/services/user.service';

export function init(_userService: UserService) {
  return () => _userService.load();
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      deps: [UserService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
