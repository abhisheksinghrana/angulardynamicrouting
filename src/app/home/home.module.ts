import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@NgModule({
  imports: [SharedModule, HomeRoutingModule],
  declarations: [HomeComponent, HeaderComponent]
})
export class HomeModule {}
