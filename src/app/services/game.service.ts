import { Injectable } from '@angular/core';
import { includes, range } from 'lodash';
import { emoji as AllEmoji, random as randomEmoji } from 'node-emoji';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, skip } from 'rxjs/operators';

import { defaultLevel, gameLevels } from '../constants';
import { GameEmoji, GameStatus, Level, Status } from '../types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private selectedEmojiKey = '';
  private gameLevel: Level = 'normal';
  private emojiCount = 0;
  private mistakes = 0;
  private _emojis$ = new BehaviorSubject<GameEmoji[]>([]);
  private _gameStatus$ = new BehaviorSubject<GameStatus | null>(null);

  get emojis$(): Observable<GameEmoji[]> {
    return this._emojis$.asObservable();
  }

  get gameStatus$(): Observable<GameStatus> {
    return this._gameStatus$.asObservable().pipe(filter((status) => !!status));
  }

  get gameInProgress(): boolean {
    return this._gameStatus$.getValue() ? true : false;
  }

  initGame(level?: Level): void {
    if (this.emojiCount !== 0) {
      return;
    }

    this.gameLevel = level || defaultLevel;

    const emojiCount = gameLevels[this.gameLevel];
    this.initEmojis(emojiCount);
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

    if (this.isSelectedEmoji(key, isPrime)) {
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
        // inclement mistake count
        this.mistakes += 1;

        syncEmojis[previousSelectIndex].selected.primary = false;
        syncEmojis[previousSelectIndex].selected.secondary = false;
        this._emojis$.next(syncEmojis);
      }
      this.selectedEmojiKey = key;
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
    this.mistakes = 0;
    this._emojis$ = new BehaviorSubject<GameEmoji[]>([]);
    this._gameStatus$ = new BehaviorSubject<GameStatus | null>(null);
  }

  /** Init game borad items(emojis). */
  private initEmojis(count: number): void {
    this.emojiCount = count;

    const limit = this.getAllEmojiCount();
    // Abort if greater than the limit of node-emoji.
    if (count >= limit) {
      return;
    }

    this.initGameStatus();
    this._emojis$.next(range(0, count).map(() => this.getUniqueRandomEmoji()));
  }

  private isSelectedEmoji(key: string, isPrime: boolean): boolean {
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

  /**
   * The upper limit which is unique is the number of emoji recorded by node-emoji.
   */
  private getAllEmojiCount(): number {
    return Object.keys(AllEmoji).length;
  }

  private getClearedEmojiCount$(): Observable<number> {
    return this.emojis$.pipe(
      distinctUntilChanged(),
      map((emojis) => emojis.length),
      map((current) => this.emojiCount - current),
    );
  }

  private initGameStatus(): void {
    this.getGameStatus$()
      .pipe(distinctUntilChanged())
      .subscribe((status: GameStatus) => {
        this._gameStatus$.next(status);
      });
  }

  private getGameStatus$(): Observable<GameStatus> {
    return this.getClearedEmojiCount$().pipe(
      skip(1),
      map((clearedEmojiCount: number) => {
        const gameStatus: Status = clearedEmojiCount === this.emojiCount ? 'clear' : 'inprogress';

        return {
          level: this.gameLevel,
          score: {
            cleared: clearedEmojiCount,
            base: this.emojiCount,
          },
          mistakes: this.mistakes / 2,
          status: gameStatus,
        };
      }),
    );
  }
}
