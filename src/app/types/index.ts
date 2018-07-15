import { Emoji } from 'node-emoji';

export type Status = 'clear' | 'inprogress' | 'timeup';

export interface GameEmoji {
  emoji: Emoji;
  selected: {
    primary: boolean;
    secondary: boolean;
  };
}

export interface GameStatus {
  score: {
    cleared: number;
    base: number;
  };
  mistakes: number;
  status: Status;
}
