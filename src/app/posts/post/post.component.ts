import { Component, OnInit } from '@angular/core';
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
export class PostComponent implements OnInit {
  post: Post;
  id: string;
  isLogin$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private authService: AuthService,
  ) {
    this.isLogin$ = this.authService.IsAuthenticated;
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    const { post } = this.route.snapshot.data;
    if (post) {
      this.post = post;
    }
  }

  deletePost() {
    this.postsService.deletePost(this.id)
      .subscribe(
        () => this.router.navigate(['../']),
        (er) => console.log(er)
      );
  }
}
