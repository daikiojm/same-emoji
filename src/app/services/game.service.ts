import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  providedIn: 'root',
})
export class GameService {
  emojis$ = new BehaviorSubject<GameEmoji[]>([]);
  selectedEmojiKey = '';

  get gameEmojis(): Observable<GameEmoji[]> {
    return this.emojis$.asObservable();
  }

  constructor() {}

  /** Init game borad items(emojis). */
  initEmojis(count: number): void {
    const limit = this.getAllEmojiCount();
    // Abort if greater than the limit of node-emoji.
    if (count >= limit) {
      return;
    }

    this.emojis$.next(range(0, count).map(() => this.getUniqueRandomEmoji()));
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
      include = includes(this.emojis$.getValue(), emoji) ? true : false;
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
    const selectIndex = this.emojis$.getValue().findIndex((item: GameEmoji) => {
      return item.emoji.key === key;
    });

    const previousSelectIndex = this.emojis$.getValue().findIndex((item: GameEmoji) => {
      return item.emoji.key === this.selectedEmojiKey;
    });

    if (this.isSElectedEmoji(key, isPrime)) {
      this.clearEmoji(key);
      return;
    } else {
      const syncEmojis = this.emojis$.getValue();
      if (isPrime) {
        syncEmojis[selectIndex].selected.primary = true;
        this.emojis$.next(syncEmojis);
      } else {
        syncEmojis[selectIndex].selected.secondary = true;
        this.emojis$.next(syncEmojis);
      }

      if (previousSelectIndex >= 0) {
        syncEmojis[previousSelectIndex].selected.primary = false;
        syncEmojis[previousSelectIndex].selected.secondary = false;
        this.emojis$.next(syncEmojis);
      }
      this.selectedEmojiKey = key;
    }
  }

  isSElectedEmoji(key: string, isPrime: boolean): boolean {
    const selectIndex = this.emojis$.getValue().findIndex((item: GameEmoji) => {
      return item.emoji.key === key;
    });

    if (
      (this.emojis$.getValue()[selectIndex].selected.primary && !isPrime) ||
      (this.emojis$.getValue()[selectIndex].selected.secondary && isPrime)
    ) {
      return true;
    } else {
      return false;
    }
  }

  clearEmoji(key: string): void {
    const syncEmojis = this.emojis$.getValue();
    const cleard = syncEmojis.filter((emoji: GameEmoji) => emoji.emoji.key !== key);
    this.emojis$.next(cleard);
  }

  /**
   * destruct instance data.
   */
  destroy(): void {
    this.emojis$ = new BehaviorSubject<GameEmoji[]>([]);
  }
}
