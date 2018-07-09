import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { GameStatus } from './../../types';
import { GameService, TimerService } from '../../services';

@Component({
  selector: 'se-game-main-page',
  templateUrl: './game-main-page.component.html',
  styleUrls: ['./game-main-page.component.scss'],
})
export class GameMainPageComponent implements OnInit, OnDestroy {
  gameClock$: Observable<number> = of(0);
  gameStatus$: Observable<GameStatus> | null = null;

  constructor(private timerService: TimerService, private gameService: GameService) {}

  ngOnInit() {
    // start play timer.
    this.timerService.startTimer();
    this.gameClock$ = this.timerService.timer$;

    this.gameStatus$ = this.gameService.gameStatus$;

    // handle game status.
    this.subscribeGameStatus();
  }

  ngOnDestroy(): void {
    this.timerService.stopTimer();
  }

  private subscribeGameStatus(): void {
    this.gameStatus$.subscribe((status: GameStatus) => {});
  }
}
