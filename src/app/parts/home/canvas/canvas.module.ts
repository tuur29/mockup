import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { CanvasComponent } from './canvas.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [CanvasComponent],
  exports: [CanvasComponent]
})
export class CanvasModule { }
