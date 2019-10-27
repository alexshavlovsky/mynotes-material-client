import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  private readonly agoTemplates = {
    seconds: 'less than a minute',
    minute: 'about a minute',
    minutes: '%d minutes',
    hour: 'about an hour',
    hours: 'about %d hours',
    day: 'a day',
    days: '%d days',
    month: 'about a month',
    months: '%d months',
    year: 'about a year',
    years: '%d years'
  };

  private format = (t, n) => this.agoTemplates[t].replace(/%d/i, Math.round(n));

  transform(time: Date, suffix: string = '', prefix: string = ''): string {
    if (time === null) return 'never';
    const seconds = Math.abs(new Date().getTime() - new Date(time).getTime()) / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const res = seconds < 45 && this.format('seconds', seconds) ||
      seconds < 90 && this.format('minute', 1) ||
      minutes < 45 && this.format('minutes', minutes) ||
      minutes < 90 && this.format('hour', 1) ||
      hours < 24 && this.format('hours', hours) ||
      hours < 42 && this.format('day', 1) ||
      days < 30 && this.format('days', days) ||
      days < 45 && this.format('month', 1) ||
      days < 365 && this.format('months', days / 30) ||
      days < 547 && this.format('year', 1) || this.format('years', days / 365);
    return prefix + res + suffix;
  }

}
