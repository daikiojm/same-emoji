import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameInProgressGuard, GameInterruptionGuard } from './guards';
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
    data: { animation: 'start' },
  },
  {
    path: 'level',
    component: GameLevelPageComponent,
    data: { animation: 'level' },
  },
  {
    path: 'play',
    component: GameMainPageComponent,
    canActivate: [GameInProgressGuard],
    canDeactivate: [GameInterruptionGuard],
    data: { animation: 'play' },
  },
  {
    path: 'result',
    component: GameResultPageComponent,
    canActivate: [GameInProgressGuard],
    data: { animation: 'result' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
