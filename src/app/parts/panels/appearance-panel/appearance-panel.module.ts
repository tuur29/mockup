import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared.module";
import { AppearancePanelComponent } from './appearance-panel.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

@NgModule({
  imports: [SharedModule, ReactiveFormsModule],
  declarations: [AppearancePanelComponent],
  exports: [AppearancePanelComponent],
  providers: [FormBuilder]
})
export class AppearancePanelModule {}
