import { Injectable } from '@angular/core';
import { Emoji, emoji as AllEmoji, random as randomEmoji, find as findEmoji } from 'node-emoji';
import { range, random, includes } from 'lodash';

export interface GameEmoji {
  emoji: Emoji;
  selected: {
    primary: boolean;
    secondary: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  emojis: GameEmoji[] = [];
  selectedEmojiKey = '';

  get gameEmojis(): GameEmoji[] {
    return this.emojis;
  }

  constructor() {}

  /** Init game borad items(emojis). */
  initEmojis(count: number): void {
    const limit = this.getAllEmojiCount();
    // Abort if greater than the limit of node-emoji.
    if (count >= limit) {
      return;
    }

    this.emojis = range(0, count).map(() => this.getUniqueRandomEmoji());
  }

  /**
   * In the game one emoji appears only once.
  */
  getUniqueRandomEmoji(): GameEmoji {
    let emoji: GameEmoji;
    let include = true;
    while (include) {
      emoji = {
        emoji: randomEmoji(),
        selected: {
          primary: false,
          secondary: false,
        },
      };
      include = includes(this.emojis, emoji) ? true : false;
    }
    return emoji;
  }

  /**
   * The upper limit which is unique is the number of emoji recorded by node-emoji.
  */
  getAllEmojiCount(): number {
    return Object.keys(AllEmoji).length;
  }

  /**
   * If emoji is selected,
   * it performs matching and clear.
   */
  selectEmoji(key: string, isPrime: boolean): void {
    const selectIndex = this.emojis.findIndex((item: GameEmoji) => {
      return item.emoji.key === key;
    });

    if (this.isSElectedEmoji(key, isPrime)) {
      this.clearEmoji(key);
      return;
    } else {
      this.selectedEmojiKey = key;
      if (isPrime) {
        this.emojis[selectIndex].selected.primary = true;
      } else {
        this.emojis[selectIndex].selected.secondary = true;
      }
    }
  }


  isSElectedEmoji(key: string, isPrime: boolean): boolean {
    const selectIndex = this.emojis.findIndex((item: GameEmoji) => {
      return item.emoji.key === key;
    });

    if ((this.emojis[selectIndex].selected.primary && !isPrime) || (this.emojis[selectIndex].selected.secondary && isPrime)) {
      return true;
    } else {
      return false;
    }
  }

  clearEmoji(key: string): void {
    const clearIndex = this.emojis.findIndex((item: GameEmoji) => {
      return item.emoji.key === key;
    });

    this.emojis.splice(clearIndex, 1);
  }
}
