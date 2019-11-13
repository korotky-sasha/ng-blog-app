import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';

import { Post } from '../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  id: string;
  post$: Observable<Post>;
  // @TODO: normal checking of login state
  isLogin: boolean = !!localStorage.getItem('token');
  isLogin$ = this.authService.IsAuthenticated;
  isEdit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.post$ = this.postsService.getPost(this.id);

    this.isLogin$.subscribe( value => {
      this.isLogin = value;
      console.log(`isLogin value: ${this.isLogin}`);
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

  editPost() {
    this.isEdit = true;
  }

  updatePost(event) {
    this.postsService.updatePost(this.id, event).subscribe();
    this.post$ = this.postsService.getPost(this.id);
    this.isEdit = false;
  }
}
