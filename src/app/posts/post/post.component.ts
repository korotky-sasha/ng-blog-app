import { Component, Input, Output,  EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

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

  @Input() post: Post;

  @Output() deleted = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private authService: AuthService,
  ) {
    this.isLogin$ = this.authService.IsAuthenticated;
  }

  deletePost() {
    this.postsService.deletePost(this.post._id)
      .subscribe(
        () => this.deleted.emit(true),
        (er) => console.log(er)
      );
  }
}
