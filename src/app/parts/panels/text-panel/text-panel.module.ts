import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { TextPanelComponent } from './text-panel.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ToggleButtonComponent } from '../../togglebutton/togglebutton.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [TextPanelComponent, ToggleButtonComponent],
  exports: [TextPanelComponent],
  providers: [FormBuilder]
})
export class TextPanelModule { }
