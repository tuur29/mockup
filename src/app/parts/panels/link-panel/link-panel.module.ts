import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared.module";
import { LinkPanelComponent } from './link-panel.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LinkPanelComponent],
  exports: [LinkPanelComponent],
})
export class LinkPanelModule {}
