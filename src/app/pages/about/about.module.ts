import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about.component';

const routes: Routes = [
  { path: "", component: AboutComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AboutComponent],
  exports: [AboutComponent]
})
export class AboutModule { }
