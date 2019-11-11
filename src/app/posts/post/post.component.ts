import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';

import { Post } from '../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post$: Observable<Post>;
  isUnauthorized = false;
  isLogin = !!localStorage.getItem('token');
  isLogin$ = this.authService.IsAuthenticated;
  isEdit = false;
  newPost = {
    title: '',
    author: '',
    content: '',
    image: '',
    description: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.postsService.getPost(params.get('id')))
    );

    this.isLogin$.subscribe( value => {
      this.isLogin = value;
    });
  }

  deletePost() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.postsService.deletePost(params.get('id')))
    ).subscribe(value => {
        // @ts-ignore
        if (value && value._id) {
          // noinspection JSIgnoredPromiseFromCall
          this.router.navigate(['../']);
        }
      },
      (er) => {
        console.log(er);
        if (er.statusText === 'Unauthorized') {
          console.log(er.statusText);
          this.isUnauthorized = true;
        }
      });
  }

  /*addPost() {
    this.postsService.addPost(this.newPost).subscribe(value => console.log(value));
  }*/

  editPost() {
    this.isEdit = true;
    this.post$.subscribe( value => this.newPost = value);
  }

  updatePost() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>  this.postsService.updatePost(params.get('id'), this.newPost))
    ).subscribe(value => console.log(value));

    this.post$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.postsService.getPost(params.get('id')))
    );

    this.isEdit = false;
  }
}
