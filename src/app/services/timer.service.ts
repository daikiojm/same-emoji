import { Injectable } from '@angular/core';
import { Observable, Subject, of, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private _timer$: Observable<number> = of(0);
  private stopped$ = new Subject<true>();

  get timer$(): Observable<number> {
    return this._timer$;
  }

  startTimer(): void {
    this._timer$ = timer(0, 1000).pipe(takeUntil(this.stopped$));
  }

  stopTimer(): void {
    this.stopped$.next();
  }

  destroy(): void {
    this._timer$ = of(0);
    this.stopped$.complete();
  }
}
