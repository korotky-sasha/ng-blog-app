import { Component, Input, Output,  EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { faTrash, faEdit, faAngleLeft, faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material';

import { AVATAR } from '../../shared/constants/avatar.constant';
import { IMAGE_PLACEHOLDER } from '../../shared/constants/image-placeholder.constant';

import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

import { PostsService } from '../services/posts.service';
import { AuthService } from '../../auth/services/auth.service';
import { Post } from '../../shared/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  isLogin$: Observable<boolean>;

  buttonMenuOpened = false;

  faTrash = faTrash;
  faEdit = faEdit;
  currentIcon = faAngleLeft;
  faPlus = faPlus;
  avatarSource = AVATAR;

  @Input() post: Post;

  @Output() deleted = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private postsService: PostsService,
    private authService: AuthService,
  ) {
    this.isLogin$ = this.authService.IsAuthenticated;
  }

  deletePost() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {message: 'A you sure you want to delete this post?'}
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.postsService.deletePost(this.post._id).subscribe(
        () => this.deleted.emit(true),
        (er) => console.log(er)
        );
      }
    });
  }

  toggleButtonMenu() {
    this.buttonMenuOpened = !this.buttonMenuOpened;
    if (this.buttonMenuOpened) {
      document.getElementById('buttonMenu').style.width = '190px';
      this.currentIcon = faAngleRight;
    } else {
      document.getElementById('buttonMenu').style.width = '0';
      this.currentIcon = faAngleLeft;
    }
  }

  invalidImage(event) {
    event.target.src = IMAGE_PLACEHOLDER;
  }
}
