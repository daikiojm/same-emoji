import { TestBed, inject } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material';

import { GameInterruptionGuard } from './game-interruption.guard';

describe('GameInterruptionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [GameInterruptionGuard],
    });
  });

  it('should ...', inject([GameInterruptionGuard], (guard: GameInterruptionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
