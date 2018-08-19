import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { GameService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class GameInProgressGuard implements CanActivate {
  constructor(private router: Router, private gameService: GameService) {}
  canActivate(): boolean {
    if (this.gameService.gameInProgress) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
