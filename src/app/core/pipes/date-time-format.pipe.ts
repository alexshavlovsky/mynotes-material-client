import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {AppPropertiesService} from '../services/app-properties.service';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {

  constructor(private appProps: AppPropertiesService) {
    super('en-US');
  }

  transform(value: any, args?: any): any {
    return super.transform(value, this.appProps.DATE_TIME_FMT);
  }

}
