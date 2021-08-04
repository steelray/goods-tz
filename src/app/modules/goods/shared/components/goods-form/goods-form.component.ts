import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseComponent } from '@core/base/base.component';
import { IGoods } from '@core/interfaces/goods.interface';
import { GoodsService } from '@core/services/goods.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-goods-form',
  templateUrl: './goods-form.component.html',
  styleUrls: ['./goods-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodsFormComponent extends BaseComponent implements OnInit {
  @Input() goods: IGoods;
  showSuccessAlert = false;
  form: FormGroup;
  constructor(
    private goodsService: GoodsService,
    private fb: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.request(this.form.value).pipe(
      takeUntil(this.destroy$)
    ).subscribe(res => {
      this.showSuccessAlert = true;
      if (!this.goods) {
        this.form.reset();
      }
    });
  }

  closeAlert(): void {
    this.showSuccessAlert = false;
  }

  private request(body: IGoods): Observable<IGoods> {
    return this.goods
      ? this.goodsService.update(this.goods.id, { id: this.goods.id, ...body })
      : this.goodsService.create(body);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      title: ['', [RxwebValidators.required(), RxwebValidators.minLength({ value: 3 })]],
      description: ['', RxwebValidators.required()],
      price: [null, [RxwebValidators.numeric(), RxwebValidators.required()]],
      in_stock: [true],
      sale: [null, RxwebValidators.numeric()]
    });

    if (this.goods) {
      this.form.patchValue(this.goods);
    }
  }

}
