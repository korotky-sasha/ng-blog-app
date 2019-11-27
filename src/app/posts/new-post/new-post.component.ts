import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

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
    private dialog: MatDialog,
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
    this.postsService.addPost(post).subscribe(() => {
      this.isChanged = false;
      this.router.navigate(['/posts']);
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
    return this.isChanged ? this.confirmDialog('A you sure you want to leave without saving changes?') : true;
  }

  confirmDialog(message?: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {message}
    });
    return  dialogRef.afterClosed();
  }
}
