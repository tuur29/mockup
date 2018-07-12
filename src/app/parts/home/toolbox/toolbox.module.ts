import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { ToolboxComponent } from './toolbox.component';
import { ColorpickerModule } from '../../colorpicker/colorpicker.module';


@NgModule({
  imports: [
    SharedModule,
    ColorpickerModule,
  ],
  declarations: [ToolboxComponent],
  exports: [ToolboxComponent]
})
export class ToolboxModule { }
