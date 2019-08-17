import {animate, animateChild, group, query as q, style, transition, trigger} from '@angular/animations';

const query = (s, a, o = {optional: true}) => q(s, a, o);

export const routerAnimation = trigger('routerAnimation', [
  transition('* => *', [
    query(':enter, :leave', style({position: 'fixed', width: '100%'})),
    query(':leave', style({zIndex: 1})),
    query(':enter', style({zIndex: 2, opacity: 0})),
    group([
      query(':leave', animateChild()),
      query(':leave', animate(1000, style({opacity: 0}))),
      query(':enter', animate(500, style({opacity: 1}))),
      query(':enter', animateChild()),
    ]),
  ])
]);
