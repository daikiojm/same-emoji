import { Emoji } from 'node-emoji';

export type Level = 'easy' | 'normal' | 'hard';
export type Status = 'clear' | 'inprogress' | 'timeup';

export interface GameEmoji {
  emoji: Emoji;
  selected: {
    primary: boolean;
    secondary: boolean;
  };
}

export interface GameStatus {
  level?: Level;
  score: {
    cleared: number;
    base: number;
  };
  mistakes: number;
  status: Status;
}
