import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GameService } from '../../services';
import { StartUpPageComponent } from './start-up-page.component';

describe('StartUpPageComponent', () => {
  let component: StartUpPageComponent;
  let fixture: ComponentFixture<StartUpPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartUpPageComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: GameService, useClass: GameService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
