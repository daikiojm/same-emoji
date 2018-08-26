import { TestBed, inject } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService],
    });
  });

  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));

  it('should have properties and public functions', inject([GameService], (service: GameService) => {
    expect(service.emojiList$).toBeTruthy();
    expect(service.gameStatus$).toBeTruthy();
    expect(service.initGame).toBeTruthy();
    expect(service.selectEmoji).toBeTruthy();
    expect(service.destroy).toBeTruthy();
  }));
});
