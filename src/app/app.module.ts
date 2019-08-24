import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppPropertiesService} from './services/app-properties.service';
import {FormValidationService} from "./services/form-validation.service";
import {AuthModule} from "./auth/auth.module";
import {ErrorComponent} from './error.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {StoreRouterConnectingModule} from '@ngrx/router-store';
import {CustomSerializer} from "./services/custom-route-serializer";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    StoreRouterConnectingModule.forRoot({serializer: CustomSerializer})
// TODO: add in the root reducer:
// export const reducers: ActionReducerMap<State> = {
//   router: routerReducer
// };
  ],
  providers: [AppPropertiesService, FormValidationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
