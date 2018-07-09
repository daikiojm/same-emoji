import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { random } from 'lodash';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

import { GameEmoji } from '../../types';

const RANGE_OFSET = 15;

@Component({
  selector: 'se-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss'],
  animations: [
    trigger('emojiState', [
      state(
        'inactive',
        style({
          transform: 'scale(1)',
        }),
      ),
      state(
        'active',
        style({
          transform: 'scale(3)',
        }),
      ),
      transition('inactive => active', animate('100ms 0.2s ease-in')),
      transition('active => inactive', animate('100ms 0.2s ease-out')),
    ]),
  ],
})
export class EmojiComponent implements OnInit, OnChanges {
  @Input() emoji: GameEmoji | null = null;
  // Since the change event does not occur unless the primitive value is changed.
  @Input() change = false;
  @Input() active = false;
  @Input() rangeX = 500;
  @Input() rangeY = 500;
  @Output() clickEmoji = new EventEmitter<string>();

  positionX = 0;
  positionY = 0;
  state = 'inactive';

  get position(): { [key: string]: string } {
    return {
      top: `${this.positionY}px`,
      left: `${this.positionX}px`,
    };
  }

  ngOnInit(): void {
    // set random emoji position.
    this.positionX = random(RANGE_OFSET, this.rangeX - RANGE_OFSET);
    this.positionY = random(RANGE_OFSET, this.rangeY - RANGE_OFSET);
  }

  ngOnChanges(): void {
    this.state = this.change ? 'active' : 'inactive';
  }

  onClickEmoji(key: string): void {
    this.state = 'active';
    timer(500, 1000)
      .pipe(take(1))
      .subscribe(() => {
        this.clickEmoji.emit(key);
      });
  }
}
