import { Injectable } from '@angular/core';
import { IGoods } from '@core/interfaces/goods.interface';

const INIT_MOCK: IGoods[] = [
  {
    title: 'Goods number 1',
    description: 'This goods is the best!',
    price: 11,
    in_stock: true,
    id: 1,
    sale: 4,
  },
  {
    title: 'Goods number 2',
    description: 'This goods is not as good as first one but it cheaper(ha)!',
    price: 9,
    in_stock: true,
    id: 2,
    sale: 2,
  }
];

@Injectable({
  providedIn: 'root'
})
export class GoodsFakeBackendService {
  private readonly lsToken = '__lnGoods';

  create(body: IGoods): IGoods {
    const allGoods = this.goods;
    // tslint:disable-next-line:no-bitwise
    const newId = this.goods[allGoods.length - 1]?.id | 1;
    body.id = newId;
    this.saveGoodsList([...this.goods, body]);
    return body;

  }

  fetchOne(id: number): IGoods {
    return this.goods.find(goods => goods.id === id);
  }

  fetchAll(): IGoods[] {
    return this.goods;
  }

  update(id: number, body: IGoods): IGoods {
    const updatedList = this.goods.map(goods => {
      if (goods.id === id) {
        return body;
      }
      return goods;
    });
    this.saveGoodsList(updatedList);
    return body;
  }

  delete(id: number): boolean {
    const updatedList = this.goods.filter(goods => goods.id !== id);
    this.saveGoodsList(updatedList);
    return true;
  }

  private get goods(): IGoods[] {
    const currentGoodsList = localStorage.getItem(this.lsToken);
    if (!currentGoodsList) {
      this.saveGoodsList(INIT_MOCK);
      return INIT_MOCK;
    }
    return JSON.parse(currentGoodsList);
  }


  private saveGoodsList(goodsList: IGoods[]): void {
    localStorage.setItem(this.lsToken, JSON.stringify(goodsList));
  }

}
