import {animate, animateChild, query as q, style, transition, trigger} from '@angular/animations';

const query = (s, a, o = {optional: true}) => q(s, a, o);

export const notebooksRoutingAnimation = [
  trigger('notebooksRoutingAnimation', [
    transition('* => *', [
      query(':enter, :leave', style({position: 'fixed', width: '100%'})),
      query(':leave', style({zIndex: 3})),
      query(':enter', style({zIndex: 4})),
      query(':leave', animateChild()),
      query(':enter', animateChild()),
    ]),
  ]),
  trigger('navBarAnimation', [
    transition(':enter', [
      query('mat-toolbar', [
        style({transform: 'translateY(-48px)'}),
        animate('1000ms ease-out', style({transform: 'translateY(0)'}))
      ])
    ]),
    transition(':leave', [
      query('mat-toolbar', [
        style({transform: 'translateY(0px)'}),
        animate('1000ms ease-in', style({transform: 'translateY(-48px)'}))
      ])
    ]),
  ])
];
