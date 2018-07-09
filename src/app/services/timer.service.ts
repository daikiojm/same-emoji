import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private _timer$ = new BehaviorSubject<number>(0);
  private stopped$ = new Subject<true>();

  get timer$(): Observable<number> {
    return this._timer$.asObservable();
  }

  startTimer(): void {
    timer(0, 1000)
      .pipe(takeUntil(this.stopped$))
      .subscribe((time: number) => {
        this._timer$.next(time);
      });
  }

  stopTimer(): void {
    this.stopped$.next();
  }

  destroy(): void {
    this._timer$.complete();
    this.stopped$.complete();
  }
}
