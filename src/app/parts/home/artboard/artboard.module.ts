import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { ArtboardComponent } from './artboard.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [ArtboardComponent],
  exports: [ArtboardComponent]
})
export class ArtboardModule { }
