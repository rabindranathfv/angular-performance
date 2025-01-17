import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategyService } from './services/preloading-strategy.service';
import { CustomPreloadingStrategyService } from './services/custom-preloading-strategy.service';
import { NetworkAwarePreloadingStrategyService } from './services/network-aware-preloading-strategy.service';



const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
    data: { preload: true, loadAfterSeconds: 4 }
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {

    path: '',
    loadChildren: () => import('./employee-list/employee-list.module').then(m => m.EmployeeListModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: NetworkAwarePreloadingStrategyService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
