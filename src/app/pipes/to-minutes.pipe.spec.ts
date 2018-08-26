import { ToMinutesPipe } from './to-minutes.pipe';

describe('ToMinutesPipe', () => {
  let pipe: ToMinutesPipe;
  beforeEach(() => {
    pipe = new ToMinutesPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return minutes string', () => {
    expect(pipe.transform(0)).toBe('00:00');
    expect(pipe.transform(3)).toBe('00:03');
    expect(pipe.transform(29)).toBe('00:29');
    expect(pipe.transform(329)).toBe('05:29');
    expect(pipe.transform(2000)).toBe('33:20');
  });
});
