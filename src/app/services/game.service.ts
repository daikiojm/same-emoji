import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, skip } from 'rxjs/operators';

import { defaultLevel, gameLevels } from '../constants';
import { GameEmoji, GameStatus, Level } from '../types';
import { getAllEmojiCount, getEmojiIndexByKey, getGameEmojiListByCount, isSelectedEmoji, mapGameStatus } from './internal';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private selectedEmojiKey = '';

  private gameLevel: Level = 'normal';

  private emojiCount = 0;

  private mistakes = 0;

  private _emojiList$ = new BehaviorSubject<GameEmoji[]>([]);

  private _gameStatus$ = new BehaviorSubject<GameStatus | null>(null);

  get emojiList$(): Observable<GameEmoji[]> {
    return this._emojiList$.asObservable();
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
   * If emoji is selected,
   * it performs matching and clear.
   */
  selectEmoji(key: string, isPrime: boolean): void {
    const selectIndex = getEmojiIndexByKey(this._emojiList$, key);
    const previousSelectIndex = getEmojiIndexByKey(this._emojiList$, this.selectedEmojiKey);

    if (isSelectedEmoji(this._emojiList$, key, isPrime)) {
      this.clearEmoji(key);
      return;
    } else {
      const syncEmojis = this._emojiList$.getValue();
      if (isPrime) {
        syncEmojis[selectIndex].selected.primary = true;
        this._emojiList$.next(syncEmojis);
      } else {
        syncEmojis[selectIndex].selected.secondary = true;
        this._emojiList$.next(syncEmojis);
      }

      if (previousSelectIndex >= 0) {
        // inclement mistake count
        this.mistakes += 1;

        syncEmojis[previousSelectIndex].selected.primary = false;
        syncEmojis[previousSelectIndex].selected.secondary = false;
        this._emojiList$.next(syncEmojis);
      }
      this.selectedEmojiKey = key;
    }
  }

  /**
   * destruct instance data.
   */
  destroy(): void {
    this.emojiCount = 0;
    this.mistakes = 0;
    this._emojiList$ = new BehaviorSubject<GameEmoji[]>([]);
    this._gameStatus$ = new BehaviorSubject<GameStatus | null>(null);
  }

  /** Init game borad items(emojis). */
  private initEmojis(count: number): void {
    this.emojiCount = count;

    // Abort if greater than the limit of node-emoji.
    if (count >= getAllEmojiCount()) {
      return;
    }

    this.initGameStatus();
    this._emojiList$.next(getGameEmojiListByCount(count));
  }

  private clearEmoji(key: string): void {
    const syncEmojis = this._emojiList$.getValue();
    const cleard = syncEmojis.filter((emoji: GameEmoji) => emoji.emoji.key !== key);
    this._emojiList$.next(cleard);
  }

  private getClearedEmojiCount$(): Observable<number> {
    return this.emojiList$.pipe(
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
      map((clearedEmojiCount: number) => mapGameStatus(this.gameLevel, clearedEmojiCount, this.emojiCount, this.mistakes)),
    );
  }
}
