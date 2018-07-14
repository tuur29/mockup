import { NgModule } from '@angular/core';
import { SymbolpickerComponent } from './symbolpicker.component';
import { SharedModule } from '../../shared.module';
import { SymbolpreviewComponent } from './symbolpreview.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [SymbolpickerComponent, SymbolpreviewComponent],
  exports: [SymbolpickerComponent]
})
export class SymbolpickerModule { }
