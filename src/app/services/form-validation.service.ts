import {Injectable} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm} from "@angular/forms";
import {AppPropertiesService} from "./app-properties.service";
import {ErrorStateMatcher} from "@angular/material";

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  constructor(private errorKey: string) {
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control.dirty || control.touched || form.submitted) && form.hasError(this.errorKey);
  }
}

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor(private appProperties: AppPropertiesService) {
  }

  getCrossFieldEqualityValidator(field1: string, field2: string, errorKey: string): (group: FormGroup) => {} | null {
    return (group: FormGroup) => {
      const value1 = group.controls[field1].value;
      const value2 = group.controls[field2].value;
      return value1 === value2 ? null : {[errorKey]: true};
    }
  }

  getValidationMessage(control: AbstractControl, options?: {}): string | null {
    for (let entry of this.appProperties.validationMessages)
      if (control.hasError(entry.name)) {
        const message = entry.message;
        if (message) return (typeof message === "function") ? message(options === undefined ? {} : options) : message;
      }
    return null;
  }
}
