import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'goods',
    loadChildren: () => import('./modules/goods/goods.module').then(m => m.GoodsModule)
  },
  {
    path: '',
    redirectTo: 'goods',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
