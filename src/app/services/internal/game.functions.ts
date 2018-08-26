import { includes } from 'lodash';
import { emoji as AllEmoji, random as randomEmoji } from 'node-emoji';
import { BehaviorSubject } from 'rxjs';

import { GameEmoji, GameStatus, Level, Status } from '../../types';

/**
 * The upper limit which is unique is the number of emoji recorded by node-emoji.
 */
export function getAllEmojiCount(): number {
  return Object.keys(AllEmoji).length;
}

/**
 * Return Emoji as GameEmoji type.
 */
export function getRandomGameEmoji(): GameEmoji {
  return {
    emoji: randomEmoji(),
    selected: {
      primary: false,
      secondary: false,
    },
  };
}

/**
 * In the game one emoji appears only once.
 * @note: Must be input smaller than the total emoji count.
 */
export function getGameEmojiListByCount(count: number): GameEmoji[] {
  const emojiList: GameEmoji[] = [];

  while (emojiList.length < count) {
    const emoji = getRandomGameEmoji();

    const include = includes(emojiList.map((obj) => obj.emoji.key), emoji.emoji.key);
    if (!include) {
      emojiList.push(emoji);
    }
  }
  return emojiList;
}

/**
 * Get index from subject of emoji list.
 */
export function getEmojiIndexByKey(emojiList$: BehaviorSubject<GameEmoji[]>, key: string): number {
  const index = emojiList$.getValue().findIndex((item: GameEmoji) => {
    return item.emoji.key === key;
  });

  return index;
}

/**
 * Get selected flag from subject of emoji list.
 */
export function isSelectedEmoji(emojiList$: BehaviorSubject<GameEmoji[]>, key: string, isPrime: boolean): boolean {
  const selectIndex = emojiList$.getValue().findIndex((item: GameEmoji) => {
    return item.emoji.key === key;
  });

  if (
    (emojiList$.getValue()[selectIndex].selected.primary && !isPrime) ||
    (emojiList$.getValue()[selectIndex].selected.secondary && isPrime)
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * Return game result as GameStatus type.
 */
export function mapGameStatus(gameLevel: Level, clearedEmojiCount: number, emojiCount: number, mistakes: number): GameStatus {
  const gameStatus: Status = clearedEmojiCount === emojiCount ? 'clear' : 'inprogress';

  return {
    level: gameLevel,
    score: {
      cleared: clearedEmojiCount,
      base: emojiCount,
    },
    mistakes: Math.ceil(mistakes / 2),
    status: gameStatus,
  };
}
