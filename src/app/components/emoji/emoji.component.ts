import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GameEmoji } from '../../services';

@Component({
  selector: 'se-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent {
  @Input() emoji: GameEmoji | null = null;
  @Output() clickEmoji = new EventEmitter<string>();

  onClickEmoji(key: string): void {
    this.clickEmoji.emit(key);
  }
}
