import { TestBed, async, inject } from '@angular/core/testing';

import { GameInterruptionGuard } from './game-interruption.guard';

describe('GameInterruptionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameInterruptionGuard],
    });
  });

  it('should ...', inject([GameInterruptionGuard], (guard: GameInterruptionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
