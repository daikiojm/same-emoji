import { TestBed, async, discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { TimerService } from './timer.service';

describe('TimerService', () => {
  let service: TimerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimerService],
    });

    service = TestBed.get(TimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.timer$).toBeTruthy();
    expect(service.startTimer).toBeTruthy();
    expect(service.stopTimer).toBeTruthy();
    expect(service.destroy).toBeTruthy();
  });

  it('should get timer', async(() => {
    expect(typeof service.timer$).toBe('object');
    expect(service.timer$ instanceof Observable).toBeTruthy();

    service.timer$.subscribe((data) => {
      expect(data).toBe(0);
    });
  }));

  it('should start timer', fakeAsync(() => {
    expect(typeof service.startTimer).toBe('function');
    expect(service.startTimer()).toBeFalsy();

    tick(1200);

    service.timer$.subscribe((data) => {
      expect(data).toBeGreaterThanOrEqual(1);
    });

    tick(2000);

    service.timer$.subscribe((data) => {
      expect(data).toBeGreaterThanOrEqual(3);
    });

    discardPeriodicTasks();
  }));

  it('should stop timer', fakeAsync(() => {
    expect(typeof service.stopTimer).toBe('function');

    service.startTimer();

    tick(2000);

    service.timer$.subscribe((data) => {
      expect(data).toBeGreaterThanOrEqual(2);
    });

    expect(service.stopTimer()).toBeFalsy();

    tick(2000);

    service.timer$.subscribe((data) => {
      expect(data).toEqual(2);
    });

    discardPeriodicTasks();
  }));

  it('should destory timer', fakeAsync(() => {
    expect(typeof service.destroy).toBe('function');

    service.startTimer();

    tick(2000);

    expect(isStoppedObservable(service.timer$)).toBe(false);

    service.stopTimer();

    tick(2000);

    service.destroy();

    expect(isStoppedObservable(service.timer$)).toBe(true);

    discardPeriodicTasks();
  }));
});

// read internal property from Observable object.
function isStoppedObservable(observable: Observable<any>): boolean {
  // tslint:disable-next-line
  const stringifyed = JSON.stringify(observable.source);
  const parsed = <any>JSON.parse(stringifyed);
  return parsed.isStopped ? true : false;
}
