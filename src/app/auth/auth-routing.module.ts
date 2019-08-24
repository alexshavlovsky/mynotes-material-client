import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {AuthWrapperComponent} from "./wrapper/auth-wrapper.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path: '', component: AuthWrapperComponent, children: [
      {path: 'login', component: LoginComponent, data: {animation: 'Login'}},
      {path: 'register', component: RegisterComponent, data: {animation: 'Register'}},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
