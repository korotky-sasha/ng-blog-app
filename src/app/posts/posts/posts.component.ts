import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { PostsService } from '../services/posts.service';
import { AuthService } from '../../auth/services/auth.service';

import { Post } from '../../shared/models/post';
import { IMAGE_PLACEHOLDER } from '../../shared/constants/image-placeholder.constant';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {
  posts: Post[];
  selectedPost: Post;
  isLogin$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private authService: AuthService
  ) {
    this.isLogin$ = this.authService.IsAuthenticated;
  }

  ngOnInit() {
    const { posts = [] } = this.route.snapshot.data;
    const firstPost = posts[0];
    this.posts = posts;
    if (firstPost) {
      this.selectPost(firstPost);
    }
  }

  selectPost(post) {
    if (this.selectedPost) {
      this.selectedPost.active = false;
    }
    this.selectedPost = post;
    this.selectedPost.active = true;
  }

  deletePost() {
    this.posts = this.posts.filter(post => post._id !== this.selectedPost._id);
    this.selectedPost = null;
  }

  invalidImage(event) {
    event.target.src = IMAGE_PLACEHOLDER;
  }
}
