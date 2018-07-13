import { NgModule } from '@angular/core';
import { SharedModule } from "../../../shared.module";
import { LayersPanelComponent } from './layers-panel.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LayersPanelComponent],
  exports: [LayersPanelComponent],
})
export class LayersPanelModule {}
