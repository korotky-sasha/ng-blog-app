import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { PostsService } from './posts.service';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsResolverService implements Resolve<Post[]> {
  constructor(
    private postsService: PostsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> | Observable<never> {
    return this.postsService.getPosts().pipe(
      // take(1),
      mergeMap(post => {
        return of(post);
      }),
      catchError(err => {
        console.log('Failed to get post', err);
        return EMPTY;
      })
    );
  }
}
