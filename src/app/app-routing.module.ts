import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartUpPageComponent, GameMainPageComponent, GameResultPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'start',
    component: StartUpPageComponent,
  },
  {
    path: 'play',
    component: GameMainPageComponent,
  },
  {
    path: 'result',
    component: GameResultPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
