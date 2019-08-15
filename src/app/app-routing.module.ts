import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './public-forms/login/login.component';
import {RegisterComponent} from './public-forms/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, data: {animation: 'Login'}},
  {path: 'register', component: RegisterComponent, data: {animation: 'Register'}},
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
