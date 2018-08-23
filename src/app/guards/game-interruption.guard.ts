import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LeaveConfirmDialogComponent } from '../components';
import { GameMainPageComponent } from '../pages';
import { GameService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class GameInterruptionGuard implements CanDeactivate<GameMainPageComponent> {
  constructor(private dialog: MatDialog, private gameService: GameService) {}
  canDeactivate(
    component: GameMainPageComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ): boolean | Observable<boolean> {
    if (nextState.url === '/result') {
      return true;
    }

    if (this.gameService.gameInProgress) {
      const dialogRef = this.dialog.open(LeaveConfirmDialogComponent);
      return <Observable<boolean>>dialogRef.afterClosed().pipe(
        tap((result) => {
          if (result) {
            this.gameService.destroy();
          }
        }),
      );
    } else {
      return true;
    }
  }
}
