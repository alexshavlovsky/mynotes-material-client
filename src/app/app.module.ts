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
import {MatIconModule, MatSnackBarModule} from '@angular/material';
import * as fromPrincipal from './store/principal/principal.reducer';
import {PrincipalEffects} from './store/principal/principal.effects';
import {AppInit} from './store/principal/principal.actions';
import {AuthTokenInterceptor} from './core/auth-token.interceptor';
import {AuthService} from './core/services/auth.service';
import {Router, Scroll} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {filter} from 'rxjs/operators';
import {NavBarModule} from './core/nav-bar/nav-bar.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    NavBarModule,
    MatIconModule,
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
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot({serializer: CustomRouterStateSerializer}),
    EffectsModule.forFeature([PrincipalEffects]),
    StoreModule.forFeature(fromPrincipal.principalFeatureKey, fromPrincipal.reducer),
  ],
  providers: [AppPropertiesService, FormValidationService, HttpService, SnackBarService, AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<AppState>) => {
        return () => store.dispatch(new AppInit());
      },
      multi: true,
      deps: [Store]
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true},
//    {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'never'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  // override the default ViewportScroller behaviour due to issues
  constructor(private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
      setTimeout(() => {
        if (e.position && !(e.position[0] === 0 && e.position[1] === 0))
          this.viewportScroller.scrollToPosition(e.position);
        else if (e.anchor)
        // try {
        //   document.querySelector('#' + e.anchor).scrollIntoView();
        // } catch (e) {
        //   this.viewportScroller.scrollToPosition([0, 0]);
        // }
          this.viewportScroller.scrollToAnchor(e.anchor);
        else
          this.viewportScroller.scrollToPosition([0, 0]);
      }, 500);
    });
  }

}
