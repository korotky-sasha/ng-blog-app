import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Post } from '../../shared/models/post';

import { PostsService } from '../services/posts.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})

export class NewPostComponent implements OnInit, OnDestroy {
  isChanged = false;

  private ngUnsubscribe: Subject<void>;
  constructor(
    private router: Router,
    private postsService: PostsService,
    private authService: AuthService
  ) {
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit() {
    this.authChecker();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  addPost(post: Post) {
    this.postsService.addPost(post).subscribe(value => {
      this.isChanged = false;
      this.router.navigate([`/posts/${value._id}`]);
    });
  }

  authChecker() {
    this.authService.IsAuthenticated
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(value => {
        if (value === false) {
          this.isChanged = false;
        }
      });
  }

  // methods for CanDeactivate guard
  formChanged() {
    this.isChanged = true;
  }

  // noinspection JSUnusedGlobalSymbols
  canDeactivate() {
    return this.isChanged ? confirm('A you sure you want to leave without saving changes?') : true;
  }

  // noinspection JSUnusedGlobalSymbols
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it OK?');

    return of(confirmation);
  }
}
