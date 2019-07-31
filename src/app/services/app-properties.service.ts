import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppPropertiesService {
  readonly appName: string = 'MyNotes';
}
