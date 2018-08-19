import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'se-start-up-page',
  templateUrl: './start-up-page.component.html',
  styleUrls: ['./start-up-page.component.scss'],
})
export class StartUpPageComponent {
  constructor(private router: Router, private gameService: GameService) {}

  onClickQuiqStart(): void {
    this.gameService.initGame();

    this.router.navigate(['/play']);
  }

  onClickStart(): void {
    this.router.navigate(['/level']);
  }
}
