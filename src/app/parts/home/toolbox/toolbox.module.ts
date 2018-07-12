import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { ToolboxComponent } from './toolbox.component';
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  imports: [
    SharedModule,
    ColorPickerModule,
  ],
  declarations: [ToolboxComponent],
  exports: [ToolboxComponent]
})
export class ToolboxModule { }
