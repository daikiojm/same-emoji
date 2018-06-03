import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultPageComponent } from './game-result-page.component';

describe('GameResultPageComponent', () => {
  let component: GameResultPageComponent;
  let fixture: ComponentFixture<GameResultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameResultPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
