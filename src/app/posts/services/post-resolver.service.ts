import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take, catchError } from 'rxjs/operators';

import { PostsService } from './posts.service';
import { Post } from '../../shared/models/post';

@Injectable({
  providedIn: 'root',
})
export class PostResolverService implements Resolve<Post> {
  constructor(private postsService: PostsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> | Observable<never> {
    const id = route.paramMap.get('id');

    return this.postsService.getPost(id).pipe(
      take(1),
      mergeMap(post => {
        return of(post);
      }),
      catchError(err => {
        console.log('Failed to get post', err);
        this.router.navigate(['/posts']);
        return EMPTY;
      })
    );
  }
}
