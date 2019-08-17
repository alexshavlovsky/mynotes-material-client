import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

export const authAnimation = trigger('authAnimation', [
  transition(':enter', [
    query('mat-card', [
      style({transform: 'translateX(100vw)'}),
      stagger(300, animate('600ms ease-out', style({transform: 'translateX(0)'})))
    ])
  ]),
  transition(':leave', [
    query('mat-card', [
      style({transform: 'translateX(0px)'}),
      stagger(300, animate('600ms ease-in', style({transform: 'translateX(-100vw)'})))
    ])
  ]),
]);
