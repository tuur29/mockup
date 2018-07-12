import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { MenubarComponent } from './menubar.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [MenubarComponent],
  exports: [MenubarComponent]
})
export class MenubarModule { }
