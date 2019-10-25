import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminContainerComponent} from './container/admin-container.component';
import {UsersListComponent} from './users-list/users-list.component';

const routes: Routes = [
  {
    path: '', component: AdminContainerComponent, children: [
      {path: 'users', pathMatch: 'full', component: UsersListComponent},
      {path: '', pathMatch: 'full', redirectTo: 'users'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
