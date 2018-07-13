import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { TextPanelComponent } from './text-panel.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [TextPanelComponent],
  exports: [TextPanelComponent]
})
export class TextPanelModule { }
