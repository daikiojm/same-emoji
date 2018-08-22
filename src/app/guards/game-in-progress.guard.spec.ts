import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GameInProgressGuard } from './game-in-progress.guard';

describe('GameInProgressGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [GameInProgressGuard],
    });
  });

  it('should ...', inject([GameInProgressGuard], (guard: GameInProgressGuard) => {
    expect(guard).toBeTruthy();
  }));
});
