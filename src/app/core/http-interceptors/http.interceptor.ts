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
    let prefixUrl;
    if (request.url.match(/treedata/ )) {
      prefixUrl = environment.treeDataUrl;
    } else {
     prefixUrl = environment.baseUrl;
    }
    const newRequest = request.clone({
      url: `${prefixUrl}${request.url}`
    });
    return next.handle(newRequest);
  }
}
