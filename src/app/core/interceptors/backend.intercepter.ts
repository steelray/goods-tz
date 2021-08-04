import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoodsFakeBackendService } from '@core/services/goods-fake-backend.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructor(
    private goodsFakeBackenService: GoodsFakeBackendService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('goods')) {
      return this.simulateGoodsRequest(request);
    }
    return next.handle(request);
  }

  private simulateGoodsRequest(request: HttpRequest<any>): Observable<HttpResponse<any>> {
    const requestMethod = request.method;
    const id = this.getIdFromUrl(request.url);
    let body = null;
    switch (requestMethod) {
      case 'POST':
        body = this.goodsFakeBackenService.create(request.body);
        break;
      case 'PUT':
        body = this.goodsFakeBackenService.update(id, request.body);
        break;
      case 'DELETE':
        body = this.goodsFakeBackenService.delete(id);
        break;
      case 'GET':
        body = id
          ? this.goodsFakeBackenService.fetchOne(id)
          : this.goodsFakeBackenService.fetchAll();
        break;
    }

    return of(new HttpResponse({ status: 200, body }));
  }

  private getIdFromUrl(url: string): number {
    url = url.substring(url.lastIndexOf('/') + 1);
    return +url.substring(url.indexOf('?') - 1);
  }
}
