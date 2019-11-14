import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostsService } from '../services/posts.service';
import { AuthService } from '../../auth/auth.service';

import { Post } from '../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  id: string;
  post: Post;
  isLogin: boolean;
  isLogin$ = this.authService.IsAuthenticated;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.route.data.subscribe( (data: {post: Post}) => {
      this.post = data.post;
    });

    this.isLogin$.subscribe( value => {
      this.isLogin = value;
    });
  }

  deletePost() {
    this.postsService.deletePost(this.id).subscribe(() => {
        this.router.navigate(['../']);
      },
      (er) => {
        console.log(er);
        if (er.statusText === 'Unauthorized') {
          console.log(er.statusText);
        }
      });
  }
}
