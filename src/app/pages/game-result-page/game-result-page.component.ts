import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { GameStatus } from './../../types';
import { GameService, TimerService } from '../../services';

@Component({
  selector: 'se-game-result-page',
  templateUrl: './game-result-page.component.html',
  styleUrls: ['./game-result-page.component.scss'],
})
export class GameResultPageComponent implements OnInit, OnDestroy {
  resultTime = 0;
  mistakes = 0;

  constructor(private timerService: TimerService, private gameService: GameService, private router: Router) {}

  ngOnInit(): void {
    this.timerService.timer$.pipe(take(1)).subscribe((time: number) => {
      this.resultTime = time;
    });

    this.gameService.gameStatus$.pipe(take(1)).subscribe((status: GameStatus) => {
      this.mistakes = status.mistakes;
    });
  }

  ngOnDestroy(): void {
    this.gameService.destroy();
  }

  retry(): void {
    this.gameService.destroy();
    this.router.navigate(['/start']);
  }
}
