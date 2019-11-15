import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostsService } from '../services/posts.service';
import { AuthService } from '../../auth/services/auth.service';

import { Post } from '../../shared/models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  isLogin = !!localStorage.getItem('token');
  isLogin$ = this.authService.IsAuthenticated;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe( (data: {posts: Post[]}) => {
      this.posts = data.posts;
    });

    this.isLogin$.subscribe( value => {
      this.isLogin = value;
    });
  }

}
