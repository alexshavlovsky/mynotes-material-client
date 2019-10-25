import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorComponent} from './shared/error/error.component';
import {RouteUrls} from './app-routing.config';
import {HasRoleUserGuard} from './core/guards/has-role-user.guard';
import {NotAuthenticatedGuard} from './core/guards/not-authenticated.guard';
import {RootResolverGuard} from './core/guards/root-resolver.guard';
import {HasRoleAdminGuard} from './core/guards/has-role-admin.guard';

const routes: Routes = [
  {
    path: RouteUrls.AUTH_CONTAINER,
    canLoad: [NotAuthenticatedGuard],
    canActivate: [NotAuthenticatedGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: RouteUrls.USER_CONTAINER,
    canLoad: [HasRoleUserGuard],
    canActivate: [HasRoleUserGuard],
    loadChildren: () => import('./notebooks/notebooks.module').then(m => m.NotebooksModule)
  },
  {
    path: RouteUrls.ADMIN_CONTAINER,
    canLoad: [HasRoleAdminGuard],
    canActivate: [HasRoleAdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {path: '**', component: ErrorComponent, canActivate: [RootResolverGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollOffset: [0, 56]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
