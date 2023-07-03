import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timer$: Observable<number>;

  constructor() {
    this.timer$ = interval(300000); // intervalo de 5 minutos (5 * 60 * 1000 ms)
  }

  public getTimer(): Observable<number> {
    return this.timer$;
  }
}