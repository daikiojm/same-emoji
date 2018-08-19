import { TestBed, async, inject } from '@angular/core/testing';

import { GameInProgressGuard } from './game-in-progress.guard';

describe('GameInProgressGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameInProgressGuard],
    });
  });

  it('should ...', inject([GameInProgressGuard], (guard: GameInProgressGuard) => {
    expect(guard).toBeTruthy();
  }));
});
