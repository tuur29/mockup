import { NgModule } from '@angular/core';
import { ColorpickerComponent } from './colorpicker.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    SharedModule,
    ColorPickerModule,
  ],
  declarations: [ColorpickerComponent],
  exports: [ColorpickerComponent]
})
export class ColorpickerModule { }
