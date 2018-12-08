import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GameService } from '../../services';
import { GameEmoji } from '../../types';

@Component({
  selector: 'se-game-board',
  templateUrl: './game-board.component.html',
})
export class GameBoardComponent implements OnInit {
  emojiList$: Observable<GameEmoji[]> | null = null;
  clones$: Observable<GameEmoji[]> | null = null;

  rangeX = 400;
  rangeY = 600;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    // init game board data.
    this.gameService.initGame();
    this.emojiList$ = this.gameService.emojiList$;
    this.clones$ = this.gameService.emojiList$;

    // init range from window size.
    this.rangeX = window.innerWidth;
    this.rangeY = window.innerHeight;
  }

  onClickEmoji(key: string): void {
    this.gameService.selectEmoji(key, true);
  }

  onClickClone(key: string): void {
    this.gameService.selectEmoji(key, false);
  }
}
