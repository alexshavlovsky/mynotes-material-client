import {animate, style, transition, trigger} from "@angular/animations";

export const formAnimations = [
  trigger('formHeader', [
    transition(':enter', [
      style({transform: 'scaleX(0)'}),
      animate('300ms ease-in', style({transform: 'scaleX(1)'}))
    ]),
  ]),
  trigger('formBody', [
    transition(':enter', [
      style({transform: 'scaleY(0)', transformOrigin: '100% 0'}),
      animate('300ms 300ms ease-in', style({transform: 'scaleY(1)', transformOrigin: '100% 0'}))
    ]),
  ]),
  trigger('formFooter', [
    transition(':enter', [
      style({transform: 'scaleY(0)', transformOrigin: '100% 0'}),
      animate('200ms 600ms ease-in', style({transform: 'scaleY(1)', transformOrigin: '100% 0'}))
    ]),
  ]),
];
