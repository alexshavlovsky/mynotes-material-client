import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AppPropertiesService} from './services/app-properties.service';

import {LoginComponent} from './public-forms/login/login.component';
import {RegisterComponent} from './public-forms/register/register.component';
import {FormValidationService} from "./services/form-validation.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  providers: [AppPropertiesService, FormValidationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
