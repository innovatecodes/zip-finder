import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicDelayService {
  private readonly timingSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public readonly timing$ = this.timingSubject.asObservable();

  public getTimingFromApiServerTiming() {
    const entries = performance.getEntriesByType('resource');
    const entry = entries.find((e) => e.name?.toLowerCase()?.includes('/json'));
    const duration = entry ? entry.duration : 0;
    this.timingSubject.next(duration);
  }
}
