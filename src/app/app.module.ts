import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppPropertiesService} from './core/services/app-properties.service';
import {FormValidationService} from './core/services/form-validation.service';
import {ErrorComponent} from './error.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomRouterStateSerializer} from './store/custom-router-sate-serializer';
import {Store, StoreModule} from '@ngrx/store';
import {AppState, metaReducers, reducers} from './store';
import {EffectsModule} from '@ngrx/effects';
import {HttpService} from './core/services/http.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SnackBarService} from './core/services/snack-bar.service';
import {MatSnackBarModule} from '@angular/material';
import * as fromPrincipal from './store/principal/principal.reducer';
import {PrincipalEffects} from './store/principal/principal.effects';
import {AppInit} from './store/principal/principal.actions';
import {AuthTokenInterceptor} from './core/auth-token.interceptor';
import * as fromNotebook from './store/notebook/notebook.reducer';
import * as fromNote from './store/note/note.reducer';

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
    StoreRouterConnectingModule.forRoot({serializer: CustomRouterStateSerializer}),
    EffectsModule.forRoot([PrincipalEffects]),
    StoreModule.forFeature(fromPrincipal.principalFeatureKey, fromPrincipal.reducer),
    StoreModule.forFeature(fromNotebook.notebooksFeatureKey, fromNotebook.reducer),
    StoreModule.forFeature(fromNote.notesFeatureKey, fromNote.reducer),
  ],
  providers: [AppPropertiesService, FormValidationService, HttpService, SnackBarService,
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<AppState>) => {
        return () => store.dispatch(new AppInit());
      },
      multi: true,
      deps: [Store]
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
