import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newRequest;
    if (request.url.match(/news\w*/)) {
      newRequest = request.clone({
        url: `${environment.mockServerUrl}${request.url}`
      });
    } else {
      newRequest = request.clone({
        url: `${environment.baseUrl}${request.url}`
      });
    }
    return next.handle(newRequest);
  }
}
