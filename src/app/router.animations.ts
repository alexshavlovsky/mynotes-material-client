import {animate, animateChild, group, query as q, sequence, style, transition, trigger} from '@angular/animations';

const query = (s, a, o = {optional: true}) => q(s, a, o);

export const routeAnimations = trigger('routeAnimations', [
  transition('* => *', [
    query(':enter, :leave', style({position: 'fixed', width: '100%'})),
    query(':enter', style({opacity: 0})),
    sequence([
      query(':leave', animateChild()),
      group([
        query(':leave', animate(200, style({opacity: 0}))),
        query(':enter', animate(200, style({opacity: 1}))),
      ]),
      query(':enter', animateChild()),
    ]),
  ])
]);
