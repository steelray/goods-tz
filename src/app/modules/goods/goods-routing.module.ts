import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsTableComponent } from './goods-table/goods-table.component';
import { GoodsUpdateComponent } from './goods-update/goods-update.component';
import { GoodsCreateComponent } from './goods-create/goods-create.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'update/:id',
        component: GoodsUpdateComponent
      },
      {
        path: 'create',
        component: GoodsCreateComponent
      },
      {
        path: '',
        component: GoodsTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsRoutingModule { }
