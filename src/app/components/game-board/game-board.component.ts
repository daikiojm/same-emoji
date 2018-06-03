import { Component, OnInit } from '@angular/core';

import { GameService, GameEmoji } from '../../services/game.service';

@Component({
  selector: 'se-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  emojis: GameEmoji[] = [];
  clones: GameEmoji[] = [];

  constructor(private gameService: GameService) {
    this.gameService.initEmojis(200);
  }

  ngOnInit() {
    this.emojis = this.gameService.gameEmojis;
    // this.clones = this.emojis.map((emoji: GameEmoji) => ({ ...emoji }));
    this.clones = this.gameService.gameEmojis;
  }

  onClickEmoji(key: string): void {
    this.gameService.selectEmoji(key, true);
  }

  onClickClone(key: string): void {
    this.gameService.selectEmoji(key, false);
  }
}
