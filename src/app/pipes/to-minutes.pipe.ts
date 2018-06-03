import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMinutes',
})
export class ToMinutesPipe implements PipeTransform {
  transform(value: number): string {
    const minutes = value / 60 >= 1 ? Math.floor(value / 60) : 0;
    const seconds = value % 60;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutesStr}:${secondsStr}`;
  }
}
