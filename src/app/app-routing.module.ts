import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategyService } from './services/preloading-strategy.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    
    path: '',
    loadChildren: () => import('./employee-list/employee-list.module').then(m => m.EmployeeListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: SelectivePreloadingStrategyService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
