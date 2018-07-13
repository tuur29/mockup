import { NgModule } from '@angular/core';
import { SymbolpickerComponent } from './symbolpicker.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [SymbolpickerComponent],
  exports: [SymbolpickerComponent]
})
export class SymbolpickerModule { }
