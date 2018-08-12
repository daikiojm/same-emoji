import { Component } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ToMinutesPipe } from '../../pipes';
import { GameService, TimerService } from '../../services';
import { GameMainPageComponent } from './game-main-page.component';

describe('GameMainPageComponent', () => {
  let component: GameMainPageComponent;
  let fixture: ComponentFixture<GameMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameMainPageComponent, MockGameBoardComponent, ToMinutesPipe],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: TimerService, useClass: TimerService }, { provide: GameService, useClass: GameService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/**
 * Mock game-board component
 */
@Component({
  selector: 'se-game-board',
  template: '<div>Mock game-board component</div>',
})
class MockGameBoardComponent {}
