import { Injectable } from '@angular/core';
import { includes, range } from 'lodash';
import { emoji as AllEmoji, random as randomEmoji } from 'node-emoji';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, skip } from 'rxjs/operators';

import { GameEmoji, GameStatus, Status } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private selectedEmojiKey = '';
  private emojiCount = 0;
  private _emojis$ = new BehaviorSubject<GameEmoji[]>([]);

  get emojis$(): Observable<GameEmoji[]> {
    return this._emojis$.asObservable();
  }

  get gameStatus$(): Observable<GameStatus> {
    return this.getGameStatus$();
  }

  /** Init game borad items(emojis). */
  initEmojis(count: number): void {
    this.emojiCount = count;

    const limit = this.getAllEmojiCount();
    // Abort if greater than the limit of node-emoji.
    if (count >= limit) {
      return;
    }

    this._emojis$.next(range(0, count).map(() => this.getUniqueRandomEmoji()));
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
      include = includes(this._emojis$.getValue(), emoji) ? true : false;
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
    const selectIndex = this._emojis$.getValue().findIndex((item: GameEmoji) => {
      return item.emoji.key === key;
    });

    const previousSelectIndex = this._emojis$.getValue().findIndex((item: GameEmoji) => {
      return item.emoji.key === this.selectedEmojiKey;
    });

    if (this.isSElectedEmoji(key, isPrime)) {
      this.clearEmoji(key);
      return;
    } else {
      const syncEmojis = this._emojis$.getValue();
      if (isPrime) {
        syncEmojis[selectIndex].selected.primary = true;
        this._emojis$.next(syncEmojis);
      } else {
        syncEmojis[selectIndex].selected.secondary = true;
        this._emojis$.next(syncEmojis);
      }

      if (previousSelectIndex >= 0) {
        syncEmojis[previousSelectIndex].selected.primary = false;
        syncEmojis[previousSelectIndex].selected.secondary = false;
        this._emojis$.next(syncEmojis);
      }
      this.selectedEmojiKey = key;
    }
  }

  isSElectedEmoji(key: string, isPrime: boolean): boolean {
    const selectIndex = this._emojis$.getValue().findIndex((item: GameEmoji) => {
      return item.emoji.key === key;
    });

    if (
      (this._emojis$.getValue()[selectIndex].selected.primary && !isPrime) ||
      (this._emojis$.getValue()[selectIndex].selected.secondary && isPrime)
    ) {
      return true;
    } else {
      return false;
    }
  }

  clearEmoji(key: string): void {
    const syncEmojis = this._emojis$.getValue();
    const cleard = syncEmojis.filter((emoji: GameEmoji) => emoji.emoji.key !== key);
    this._emojis$.next(cleard);
  }

  /**
   * destruct instance data.
   */
  destroy(): void {
    this.emojiCount = 0;
    this._emojis$ = new BehaviorSubject<GameEmoji[]>([]);
  }

  private getClearedEmojiCount$(): Observable<number> {
    return this.emojis$.pipe(
      distinctUntilChanged(),
      map((emojis) => emojis.length),
      map((current) => this.emojiCount - current),
    );
  }

  private getGameStatus$(): Observable<GameStatus> {
    return this.getClearedEmojiCount$().pipe(
      skip(1),
      map((clearedEmojiCount: number) => {
        const gameStatus: Status = clearedEmojiCount === this.emojiCount ? 'clear' : 'inprogress';

        return {
          score: {
            cleared: clearedEmojiCount,
            base: this.emojiCount,
          },
          status: gameStatus,
        };
      }),
    );
  }
}
