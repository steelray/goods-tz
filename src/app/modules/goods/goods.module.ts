import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoodsRoutingModule } from './goods-routing.module';
import { GoodsFormComponent } from './shared/components/goods-form/goods-form.component';
import { GoodsTableComponent } from './goods-table/goods-table.component';
import { IconsModule } from '@core/modules/bootstrap-icons.module';
import { GoodsCreateComponent } from './goods-create/goods-create.component';
import { GoodsUpdateComponent } from './goods-update/goods-update.component';
import { UIModule } from '@ui/components/header/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [GoodsFormComponent, GoodsTableComponent, GoodsCreateComponent, GoodsUpdateComponent],
  imports: [
    CommonModule,
    GoodsRoutingModule,
    IconsModule,
    UIModule,
    ReactiveFormsModule,
    NgbAlertModule
  ]
})
export class GoodsModule { }
