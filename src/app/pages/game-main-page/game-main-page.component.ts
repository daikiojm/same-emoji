import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, timer } from 'rxjs';

import { TimerService } from '../../services';

@Component({
  selector: 'se-game-main-page',
  templateUrl: './game-main-page.component.html',
  styleUrls: ['./game-main-page.component.scss'],
})
export class GameMainPageComponent implements OnInit, OnDestroy {
  gameClock$: Observable<number> = of(0);

  constructor(private timerService: TimerService) {}

  ngOnInit() {
    // start play timer.
    this.timerService.startTimer();
    this.gameClock$ = this.timerService.timer$;
  }

  ngOnDestroy() {
    this.timerService.stopTimer();
  }
}
