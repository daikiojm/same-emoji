import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GameEmoji, GameService } from '../../services';

@Component({
  selector: 'se-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnDestroy {
  emojis$ = new Observable<GameEmoji[]>();
  clones$ = new Observable<GameEmoji[]>();
  rangeX = 400;
  rangeY = 600;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    // init game board data.
    this.gameService.initEmojis(20);
    this.emojis$ = this.gameService.gameEmojis;
    this.clones$ = this.gameService.gameEmojis;

    // init range from window size.
    this.rangeX = window.innerWidth;
    this.rangeY = window.innerHeight;
  }

  ngOnDestroy() {
    this.gameService.destroy();
  }

  onClickEmoji(key: string): void {
    this.gameService.selectEmoji(key, true);
  }

  onClickClone(key: string): void {
    this.gameService.selectEmoji(key, false);
  }
}
