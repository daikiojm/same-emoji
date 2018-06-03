import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { random } from 'lodash';
import { GameEmoji } from '../../services';

@Component({
  selector: 'se-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {
  @Input() emoji: GameEmoji | null = null;
  @Input() rangeX = 500;
  @Input() rangeY = 500;
  @Output() clickEmoji = new EventEmitter<string>();

  positionX = 0;
  positionY = 0;

  get position(): { [key: string]: string } {
    return {
      top: `${this.positionX}px`,
      left: `${this.positionY}px`,
    };
  }

  ngOnInit() {
    // set random emoji position.
    this.positionX = random(0, this.rangeX);
    this.positionY = random(0, this.rangeY);
  }

  onClickEmoji(key: string): void {
    this.clickEmoji.emit(key);
  }
}
