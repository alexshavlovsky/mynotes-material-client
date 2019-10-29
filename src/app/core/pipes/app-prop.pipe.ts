import {Pipe, PipeTransform} from '@angular/core';
import {AppPropertiesService} from '../services/app-properties.service';

@Pipe({
  name: 'appProp'
})
export class AppPropPipe implements PipeTransform {

  constructor(private appProps: AppPropertiesService) {
  }

  transform(propertyKey: string): string {
    return this.appProps[propertyKey];
  }

}
