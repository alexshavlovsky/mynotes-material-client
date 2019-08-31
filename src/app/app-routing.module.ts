import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './error.component';
import {AuthGuard} from './core/guards/auth.guard';
import {AuthDispatcherGuard} from './core/guards/auth-dispatcher.guard';
import {AuthInverseGuard} from './core/guards/auth-inverse.guard';

const routes: Routes = [
  {
    path: 'auth',
    canLoad: [AuthInverseGuard],
    canActivate: [AuthInverseGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    data: {animation: 'auth'}
  },
  {
    path: 'notebooks',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    loadChildren: () => import('./notebooks/notebooks.module').then(m => m.NotebooksModule),
    data: {animation: 'notebooks'}
  },
  {path: '**', component: ErrorComponent, canActivate: [AuthDispatcherGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
