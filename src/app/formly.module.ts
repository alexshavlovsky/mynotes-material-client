import {FormlyModule} from "@ngx-formly/core";
import {FormlyMaterialModule} from "@ngx-formly/material";
import {NgModule} from "@angular/core";

@NgModule({
  imports: [FormlyModule.forRoot({
    validators: [
      {name: 'email', validation: c => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.value) ? null : {'email': true}},
    ],
    validationMessages: [
      {name: 'required', message: 'This field is required'},
      {name: 'minlength', message: (_, f) => `Please enter at least ${f.templateOptions.minLength} characters`},
      {name: 'email', message: 'Please enter a valid email address'}
    ],
  }),
    FormlyMaterialModule],
  exports: [FormlyModule, FormlyMaterialModule]
})
export class AppFormlyModule {
}
