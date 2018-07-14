import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { CanvasComponent } from './canvas.component';
import { ArtboardModule } from '../artboard/artboard.module';

@NgModule({
  imports: [
    SharedModule,
    ArtboardModule,
  ],
  declarations: [CanvasComponent],
  exports: [CanvasComponent]
})
export class CanvasModule { }
