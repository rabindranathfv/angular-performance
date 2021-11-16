import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkAwarePreloadingStrategyService implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    const connection = navigator.connection;
    console.log('navigator connection INFO', connection, connection.saveData, connection.effectiveType);
    if (connection.saveData) {
      return of(null);
    }
    const speed = connection.effectiveType;
    const slowConnections = ['slow-2g', '2g','3g'];
    if (slowConnections.includes(speed)) {
      return of(null);
    }
    return load();
  }
}