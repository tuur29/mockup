import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { StatusComponent } from './status.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [StatusComponent],
  exports: [StatusComponent]
})
export class StatusModule { }
