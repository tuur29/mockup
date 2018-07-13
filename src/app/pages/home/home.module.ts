import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';
import { MenubarModule } from '../../parts/home/menubar/menubar.module';
import { ToolboxModule } from '../../parts/home/toolbox/toolbox.module';
import { StatusModule } from '../../parts/home/status/status.module';
import { CanvasModule } from '../../parts/home/canvas/canvas.module';

import { AppearancePanelModule } from '../../parts/panels/appearance-panel/appearance-panel.module';
import { TextPanelModule } from '../../parts/panels/text-panel/text-panel.module';
import { LayersPanelModule } from '../../parts/panels/layers-panel/layers-panel.module';
import { LinkPanelModule } from '../../parts/panels/link-panel/link-panel.module';

const routes: Routes = [
  { path: "", component: HomeComponent},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),

    MenubarModule,
    ToolboxModule,
    StatusModule,
    CanvasModule,
    
    AppearancePanelModule,
    TextPanelModule,
    LayersPanelModule,
    LinkPanelModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
