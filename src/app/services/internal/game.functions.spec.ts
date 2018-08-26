import {
  getAllEmojiCount,
  getEmojiIndexByKey,
  getGameEmojiListByCount,
  getRandomGameEmoji,
  isSelectedEmoji,
  mapGameStatus,
} from './game.functions';

describe('GameService internal functions', () => {
  it('getAllEmojiCount', () => {
    expect(typeof getAllEmojiCount).toBe('function');
    expect(getAllEmojiCount()).toBeGreaterThan(100);
  });

  it('getRandomGameEmoji', () => {
    expect(typeof getRandomGameEmoji).toBe('function');

    const result = getRandomGameEmoji();

    expect(result).toHaveProperty('emoji');
    expect(result).toHaveProperty('selected');
    expect(result.emoji).toHaveProperty('emoji');
    expect(result.emoji.emoji).toBeTruthy();
    expect(result.emoji).toHaveProperty('key');
    expect(result.emoji.key).toBeTruthy();
    expect(result.selected).toHaveProperty('primary');
    expect(result.selected.primary).toBeFalsy();
    expect(result.selected).toHaveProperty('secondary');
    expect(result.selected.secondary).toBeFalsy();
  });

  it('getGameEmojiListByCount', () => {
    expect(typeof getGameEmojiListByCount).toBe('function');

    const resultWithInput5 = getGameEmojiListByCount(5);
    expect(resultWithInput5).toHaveLength(5);

    const duplicatesWithInput5 = resultWithInput5.map((obj) => obj.emoji.key).filter((v, i, a) => a.indexOf(v) !== a.lastIndexOf(v));
    expect(duplicatesWithInput5).toHaveLength(0);

    const resultWithInput40 = getGameEmojiListByCount(5);
    expect(resultWithInput40).toHaveLength(5);

    const duplicatesWithInput40 = resultWithInput40.map((obj) => obj.emoji.key).filter((v, i, a) => a.indexOf(v) !== a.lastIndexOf(v));
    expect(duplicatesWithInput40).toHaveLength(0);
  });

  it('getEmojiIndexByKey', () => {
    expect(typeof getEmojiIndexByKey).toBe('function');
  });

  it('isSelectedEmoji', () => {
    expect(typeof isSelectedEmoji).toBe('function');
  });

  it('mapGameStatus', () => {
    expect(typeof mapGameStatus).toBe('function');
  });
});
