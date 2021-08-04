export interface IGoods {
  title: string;
  description: string;
  price: number;
  in_stock: boolean;
  id?: number;
  sale?: number;
}

export interface IGoodsFilterParams {
  title: string;
}
