import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './error.component';
import {AuthGuard} from './core/guards/auth.guard';
import {AuthDispatcherGuard} from './core/guards/auth-dispatcher.guard';
import {AuthInverseGuard} from './core/guards/auth-inverse.guard';
import {RouteUrls} from './app-routing.config';

const routes: Routes = [
  {
    path: RouteUrls.AUTH_CONTAINER,
    canLoad: [AuthInverseGuard],
    canActivate: [AuthInverseGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: RouteUrls.USER_CONTAINER,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import('./notebooks/notebooks.module').then(m => m.NotebooksModule)
  },
  {path: '**', component: ErrorComponent, canActivate: [AuthDispatcherGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollOffset: [0, 56]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
