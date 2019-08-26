import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthComponent} from "./auth.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path: '', component: AuthComponent, children: [
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
