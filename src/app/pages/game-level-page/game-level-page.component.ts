import { Component, OnInit } from '@angular/core';

import { gameLevels } from '../../constants';

@Component({
  selector: 'se-game-level-page',
  templateUrl: './game-level-page.component.html',
  styleUrls: ['./game-level-page.component.scss'],
})
export class GameLevelPageComponent implements OnInit {
  gameLevels = gameLevels;

  constructor() {}

  ngOnInit() {}
}
