import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatDividerModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { ToMinutesPipe } from '../../pipes';
import { GameService, TimerService } from '../../services';
import { GameResultPageComponent } from './game-result-page.component';

describe('GameResultPageComponent', () => {
  let component: GameResultPageComponent;
  let fixture: ComponentFixture<GameResultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameResultPageComponent, ToMinutesPipe],
      imports: [MatDividerModule, RouterTestingModule.withRoutes([])],
      providers: [{ provide: TimerService, useClass: TimerService }, { provide: GameService, useClass: GameService }],
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
