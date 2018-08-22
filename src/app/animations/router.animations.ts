import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const routerTransition = trigger('routerTransition', [
  transition('initial => start, result => start', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
      query(':enter', [style({ opacity: '0' }), animate('2s cubic-bezier(0.165, 0.84, 0.44, 1)', style({ opacity: '1' }))], {
        optional: true,
      }),
      query(':leave', [style({ opacity: '1' }), animate('2s cubic-bezier(0.165, 0.84, 0.44, 1)', style({ opacity: '0' }))], {
        optional: true,
      }),
    ]),
  ]),
  transition('play => start, level => start, play => level', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
      query(':enter', [style({ transform: 'translateX(0%)' }), animate('0.3s ease-in-out', style({ transform: 'translateX(100%)' }))], {
        optional: true,
      }),
      query(':leave', [style({ transform: 'translateX(-100%)' }), animate('0.3s ease-in-out', style({ transform: 'translateX(0%)' }))], {
        optional: true,
      }),
    ]),
  ]),
  transition('* => level, * => play, * => result', [
    query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
    group([
      query(':enter', [style({ transform: 'translateX(100%)' }), animate('0.3s ease-in-out', style({ transform: 'translateX(0%)' }))], {
        optional: true,
      }),
      query(':leave', [style({ transform: 'translateX(0%)' }), animate('0.3s ease-in-out', style({ transform: 'translateX(-100%)' }))], {
        optional: true,
      }),
    ]),
  ]),
]);
