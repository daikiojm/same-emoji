import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameLevelPageComponent, GameMainPageComponent, GameResultPageComponent, StartUpPageComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
  {
    path: 'start',
    component: StartUpPageComponent,
  },
  {
    path: 'level',
    component: GameLevelPageComponent,
  },
  {
    path: 'play',
    component: GameMainPageComponent,
  },
  {
    path: 'result',
    component: GameResultPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
