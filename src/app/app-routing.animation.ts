import {animateChild, query as q, style, transition, trigger} from '@angular/animations';

const query = (s, a, o = {optional: true}) => q(s, a, o);

export const appRoutingAnimation = trigger('appRoutingAnimation', [
  transition('* => *', [
    query(':enter, :leave', style({position: 'fixed', width: '100%'})),
    query(':leave', style({zIndex: 1})),
    query(':enter', style({zIndex: 2})),
    query('@*', animateChild()),
  ]),
]);
