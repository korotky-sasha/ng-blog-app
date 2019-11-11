import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';

import { Post } from '../models/post';

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
    private postsService: PostsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.postsService.getPosts().subscribe(value => {
      this.posts = value;
    });

    this.isLogin$.subscribe( value => {
      this.isLogin = value;
    });
  }

}
