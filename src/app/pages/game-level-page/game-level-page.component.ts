import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { gameLevels } from '../../constants';
import { GameService } from '../../services';
import { Level } from '../../types';

@Component({
  selector: 'se-game-level-page',
  templateUrl: './game-level-page.component.html',
  styleUrls: ['./game-level-page.component.scss'],
})
export class GameLevelPageComponent {
  gameLevels: Level[] = <Level[]>Object.keys(gameLevels);

  constructor(private router: Router, private gameService: GameService) {}

  onClickLevelButton(level: Level): void {
    this.gameService.initGame(level);

    this.router.navigateByUrl('/play');
  }
}
