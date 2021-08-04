import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGoods, IGoodsFilterParams } from '../interfaces/goods.interface';
import { IPageableData } from '../interfaces/pageable-data.interface';

export const goodsController = 'goods';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  constructor(private http: HttpClient) { }

  create(body: IGoods): Observable<IGoods> {
    return this.http.post<IGoods>(`${goodsController}`, body);
  }

  fetchOne(id: number): Observable<IGoods> {
    return this.http.get<IGoods>(`${goodsController}/${id}`);
  }

  fetchAll(params?: IPageableData<IGoodsFilterParams>): Observable<IGoods[]> {
    return this.http.get<IGoods[]>(`${goodsController}`);
  }

  update(id: number, body: IGoods): Observable<IGoods> {
    return this.http.put<IGoods>(`${goodsController}/${id}`, body);
  }

  delete(id: number): Observable<IGoods> {
    return this.http.delete<IGoods>(`${goodsController}/${id}`);
  }

}

