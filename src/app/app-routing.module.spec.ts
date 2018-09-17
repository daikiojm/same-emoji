import { Location } from '@angular/common';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameLevelPageComponent, GameMainPageComponent, GameResultPageComponent, StartUpPageComponent } from './pages';
import { ToMinutesPipe } from './pipes/to-minutes.pipe';
import { TestingModule } from './testing';

describe('app routing tests', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), TestingModule],
      declarations: [
        AppComponent,
        StartUpPageComponent,
        GameLevelPageComponent,
        GameResultPageComponent,
        GameMainPageComponent,
        ToMinutesPipe,
      ],
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  });

  it('navigate to "" redirects to /start', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/start');
  }));

  it('navigate to /start', fakeAsync(() => {
    router.navigate(['/start']);
    tick();
    expect(location.path()).toBe('/start');
  }));

  it('navigate to /level', fakeAsync(() => {
    router.navigate(['/level']);
    tick();
    expect(location.path()).toBe('/level');
  }));

  it('navigate to /play redirects to /start', fakeAsync(() => {
    router.navigate(['/play']);
    tick();
    expect(location.path()).toBe('/start');
  }));

  it('navigate to /result redirects to /start', fakeAsync(() => {
    router.navigate(['/result']);
    tick();
    expect(location.path()).toBe('/start');
  }));
});
