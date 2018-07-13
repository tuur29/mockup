import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared.module";
import { AppearancePanelComponent } from './appearance-panel.component';

@NgModule({
  imports: [SharedModule],
  declarations: [AppearancePanelComponent],
  exports: [AppearancePanelComponent],
})
export class AppearancePanelModule {}
