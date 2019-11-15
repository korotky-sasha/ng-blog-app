import { Injectable } from '@angular/core';
import {
  CanLoad,
  CanActivate,
  CanDeactivate,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate, CanDeactivate<CanComponentDeactivate> {
  constructor(
    private authService: AuthService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
    return !!this.authService.getToken();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return !!this.authService.getToken();
  }

  canDeactivate(
    component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
