import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class BaseComponent implements OnDestroy {
  // tslint:disable-next-line:variable-name
  private _destroy$: Subject<any>;

  get destroy$(): Subject<any> {
    if (!this._destroy$) {
      this._destroy$ = new Subject();
    }
    return this._destroy$;
  }

  ngOnDestroy(): void {
    if (this._destroy$) {
      this._destroy$.next(true);
      this._destroy$.complete();
    }
  }
}
