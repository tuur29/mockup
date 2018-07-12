import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RouterModule, Routes } from '@angular/router';

import { GitComponent } from './git.component';

const routes: Routes = [
  { path: "", component: GitComponent},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [GitComponent]
})
export class GitModule { }
