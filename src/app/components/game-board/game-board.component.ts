import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { GameService, GameEmoji } from '../../services';

@Component({
  selector: 'se-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent implements OnInit, OnDestroy {
  emojis$ = new Observable<GameEmoji[]>();
  clones$ = new Observable<GameEmoji[]>();

  constructor(private gameService: GameService) {}

  ngOnInit() {
    // init game board data.
    this.gameService.initEmojis(20);
    this.emojis$ = this.gameService.gameEmojis;
    this.clones$ = this.gameService.gameEmojis;
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
