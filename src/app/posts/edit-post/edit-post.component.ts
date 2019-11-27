import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

import { Post } from '../../shared/models/post';

import { PostsService } from '../services/posts.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  id: string;
  post: Post;
  isChanged = false;

  private ngUnsubscribe: Subject<void>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private postsService: PostsService,
    private authService: AuthService
  ) {
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit() {
    this.getPost();
    this.authChecker();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updatePost(post) {
    this.postsService.updatePost(this.id, post).subscribe( () => {
      this.isChanged = false;
      this.router.navigate(['posts']);
    });
  }

  getPost() {
    this.id = this.route.snapshot.paramMap.get('id');
    const { post } = this.route.snapshot.data;
    if (post) {
      this.post = post;
    }
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
