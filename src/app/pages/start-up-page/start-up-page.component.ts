import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { defaultHost } from '../../constants';
import { GameService } from '../../services';
import { Language } from '../../types';

@Component({
  selector: 'se-start-up-page',
  templateUrl: './start-up-page.component.html',
  styleUrls: ['./start-up-page.component.scss'],
})
export class StartUpPageComponent {
  get host(): string {
    return environment.host ? environment.host : defaultHost;
  }

  constructor(private router: Router, private gameService: GameService) {}
  languages = Language;

  onClickQuiqStart(): void {
    this.gameService.initGame();

    this.router.navigateByUrl('/play');
  }

  onClickStart(): void {
    this.router.navigateByUrl('/level');
  }

  onClickLanguage(lang: Language): void {
    location.href = `${this.host}/${lang}`;
  }
}
