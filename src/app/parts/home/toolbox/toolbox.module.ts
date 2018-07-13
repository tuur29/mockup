import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { ToolboxComponent } from './toolbox.component';
import { ColorpickerModule } from '../../colorpicker/colorpicker.module';
import { SymbolpickerModule } from '../../symbolpicker/symbolpicker.module';


@NgModule({
  imports: [
    SharedModule,
    ColorpickerModule,
    SymbolpickerModule,
  ],
  declarations: [ToolboxComponent],
  exports: [ToolboxComponent]
})
export class ToolboxModule { }
