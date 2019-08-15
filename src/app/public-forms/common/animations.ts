import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

export const formAnimations = trigger('formAnimations', [
  transition(':enter', [
    query('mat-card', [
      style({transform: 'translateY(-100vh)'}),
      stagger(-100, animate('800ms ease-out', style({transform: 'translateY(0)'})))
    ])
  ]),
  transition(':leave', [
    query('mat-card', [
      style({transform: 'translateY(0px)'}),
      stagger(100, animate('800ms ease-in', style({transform: 'translateY(-100vh)'})))
    ])
  ]),
]);
