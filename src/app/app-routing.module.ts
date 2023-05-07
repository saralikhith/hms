import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin/admin.guard';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { UserGuard } from './user/user.guard';

const routes: Routes = [
  {
    path: 'user',canActivate:[UserGuard],
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',canActivate:[AdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./intro/intro.module').then((m) => m.IntroModule),
  },
 {path:'**',component:PagenotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
