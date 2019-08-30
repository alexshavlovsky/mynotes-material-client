import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from "./error.component";
import {AuthGuard} from "./guards/auth.guard";
import {AuthDispatcherGuard} from "./guards/auth-dispatcher.guard";
import {AuthInverseGuard} from "./guards/auth-inverse.guard";

const routes: Routes = [
  {
    path: 'auth',
    canLoad: [AuthInverseGuard],
    canActivate: [AuthInverseGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'notebooks',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import('./notebooks/notebooks.module').then(m => m.NotebooksModule)
  },
  {path: '**', component: ErrorComponent, canActivate: [AuthDispatcherGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
