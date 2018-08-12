import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GameService } from '../../services';
import { GameEmoji } from '../../types';

@Component({
  selector: 'se-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnDestroy {
  emojis$: Observable<GameEmoji[]> | null = null;
  clones$: Observable<GameEmoji[]> | null = null;

  rangeX = 400;
  rangeY = 600;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    // init game board data.
    this.gameService.initGame();
    this.emojis$ = this.gameService.emojis$;
    this.clones$ = this.gameService.emojis$;

    // init range from window size.
    this.rangeX = window.innerWidth;
    this.rangeY = window.innerHeight;
  }

  ngOnDestroy() {}

  onClickEmoji(key: string): void {
    this.gameService.selectEmoji(key, true);
  }

  onClickClone(key: string): void {
    this.gameService.selectEmoji(key, false);
  }
}
