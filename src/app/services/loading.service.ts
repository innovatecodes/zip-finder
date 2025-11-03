import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly loading: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public readonly loading$: Observable<boolean> = this.loading.asObservable();

  public setLoading(isLoading: boolean): void {
    this.loading.next(isLoading);
  }

  public showLoading() {
    this.loading.next(true);
  }

  public hideLoading() {
    this.loading.next(false);
  }
}
