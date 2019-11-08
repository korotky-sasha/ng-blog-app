import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';

interface Post {
  _id: string;
  title: string;
  author: string;
  content: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post$: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    /*this.postsService.getUser().subscribe( value => {
      this.post = value;
      console.log(this.post);
    });*/
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.postsService.getPost(params.get('id')))
    );
  }

  deletePost() {
    console.log('Your token: ', this.authService.getToken());
  }
}
