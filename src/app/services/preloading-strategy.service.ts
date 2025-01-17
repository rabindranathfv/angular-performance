import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
    public preloadedModules: string[] = [];

    public preload(route: Route, load: () => Observable<any>): Observable<any> {
        console.log('route into into CUSTOM Preload strategy', route);
        if (route.data && route.data.preload) {
            // add the route path to the preloaded module array
            this.preloadedModules.push(route.path);

            // log the route path to the console
            console.log('Preloaded: ' + route.path);

            return load();
        } else {
            return of(null);
        }
    }
}
