import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IGoods } from '@core/interfaces/goods.interface';
import { GoodsService } from '@core/services/goods.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-goods-update',
  templateUrl: './goods-update.component.html',
  styleUrls: ['./goods-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodsUpdateComponent implements OnInit {
  goods$: Observable<IGoods>;
  constructor(
    private goodsService: GoodsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.goods$ = this.goodsService.fetchOne(this.activatedRoute.snapshot.params.id);
  }

}
