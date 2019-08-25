import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthWrapperComponent} from './wrapper/auth-wrapper.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AuthRoutingModule} from "./auth-routing.module";
import {StoreModule} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth.effects';

@NgModule({
  declarations: [
    AuthWrapperComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    StoreModule.forFeature(fromAuth.authStateKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule {
}
