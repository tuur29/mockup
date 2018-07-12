import { NgModule } from '@angular/core';
import { ColorpickerComponent } from './colorpicker.component';
import { TranslateModule } from '@ngx-translate/core';
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    SharedModule,
    TranslateModule,
    ColorPickerModule,
  ],
  declarations: [ColorpickerComponent],
  exports: [ColorpickerComponent]
})
export class ColorpickerModule { }
