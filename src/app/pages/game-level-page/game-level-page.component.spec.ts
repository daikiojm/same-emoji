import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { GameLevelPageComponent } from './game-level-page.component';

describe('GameLevelPageComponent', () => {
  let component: GameLevelPageComponent;
  let fixture: ComponentFixture<GameLevelPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameLevelPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLevelPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
