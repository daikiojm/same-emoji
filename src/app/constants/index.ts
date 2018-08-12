import { Level } from '../types';

export const gameLevels: { [key: string]: number } = {
  easy: 5,
  normal: 15,
  hard: 50,
};

export const defaultLevel: Level = 'normal';
