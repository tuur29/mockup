import { NgModule } from '@angular/core';
import { Routes, RouterModule, NoPreloading } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: "../app/pages/home/home.module#HomeModule",
        pathMatch: 'full',
        data: { preload: false },
    },
    {
        path: 'git',
        loadChildren: "../app/pages/git/git.module#GitModule",
        data: { preload: false },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true, preloadingStrategy: NoPreloading})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
