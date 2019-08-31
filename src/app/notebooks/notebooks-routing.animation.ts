import {animateChild, query as q, style, transition, trigger} from '@angular/animations';

const query = (s, a, o = {optional: true}) => q(s, a, o);

export const notebooksRoutingAnimation = trigger('notebooksRoutingAnimation', [
  transition('* => *', [
    query(':enter, :leave', style({position: 'fixed', width: '100%'})),
    query(':leave', style({zIndex: 3})),
    query(':enter', style({zIndex: 4})),
    query(':leave', animateChild()),
    query(':enter', animateChild()),
  ])
]);
