import { Component, OnInit } from '@angular/core';

import { TimerService } from '../../services';

@Component({
  selector: 'se-game-result-page',
  templateUrl: './game-result-page.component.html',
  styleUrls: ['./game-result-page.component.scss'],
})
export class GameResultPageComponent implements OnInit {
  resultTime = 0;

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.timerService.timer$.subscribe((time: number) => {
      this.resultTime = time;
    });
  }
}
