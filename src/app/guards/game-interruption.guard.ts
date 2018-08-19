import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

import { GameMainPageComponent } from '../pages';
import { GameService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class GameInterruptionGuard implements CanDeactivate<GameMainPageComponent> {
  constructor(private gameService: GameService) {}
  canDeactivate(
    component: GameMainPageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ): boolean {
    if (nextState.url === '/result') {
      return true;
    }

    if (this.gameService.gameInProgress) {
      const msg = 'Are you sure you want to interrupt the game';
      const result = confirm(msg);
      return result ? this.gameService.destroy() || true : false;
    } else {
      return true;
    }
  }
}
