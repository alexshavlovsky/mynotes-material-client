import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppPropertiesService} from './services/app-properties.service';
import {FormValidationService} from "./services/form-validation.service";
import {ErrorComponent} from './error.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomSerializer} from "./services/custom-route-serializer";
import {Store, StoreModule} from '@ngrx/store';
import {AppState, metaReducers, reducers} from './store';
import {EffectsModule} from '@ngrx/effects';
import {HttpService} from "./services/http.service";
import {HttpClientModule} from "@angular/common/http";
import {SnackBarService} from "./services/snack-bar.service";
import {MatSnackBarModule} from "@angular/material";
import * as fromPrincipal from './store/principal/principal.reducer';
import {PrincipalEffects} from "./store/principal/principal.effects";
import {AppInit} from "./store/principal/principal.actions";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSnackBarModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot({serializer: CustomSerializer}),
    EffectsModule.forRoot([PrincipalEffects]),
    StoreModule.forFeature(fromPrincipal.principalFeatureKey, fromPrincipal.reducer),
  ],
  providers: [AppPropertiesService, FormValidationService, HttpService, SnackBarService,
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<AppState>) => {
        return () => store.dispatch(new AppInit());
      },
      multi: true,
      deps: [Store]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
