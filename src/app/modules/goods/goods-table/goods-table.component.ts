import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IGoods } from '@core/interfaces/goods.interface';
import { GoodsService } from '@core/services/goods.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/core/base/base.component';

@Component({
  selector: 'app-goods-table',
  templateUrl: './goods-table.component.html',
  styleUrls: ['./goods-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodsTableComponent extends BaseComponent implements OnInit {
  private readonly updateList$ = new BehaviorSubject(null);
  goodsList$: Observable<IGoods[]>;
  constructor(
    private goodsService: GoodsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.goodsList$ = this.updateList$.pipe(
      switchMap(() => this.goodsService.fetchAll())
    );
  }

  trackByFn(index: number): number {
    return index;
  }

  onDelete(goods: IGoods): void {
    if (window.confirm(`Are you sure want to delete ${goods.title}`)) {
      this.goodsService.delete(goods.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => this.updateList$.next(null));
    }
  }

}
