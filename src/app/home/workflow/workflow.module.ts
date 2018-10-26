import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { WorkflowRoutingModule } from './workflow-routing.module';

import { WorkflowComponent } from './workflow.component';

@NgModule({
  imports: [SharedModule, WorkflowRoutingModule],
  declarations: [WorkflowComponent]
})
export class WorkflowModule {}
