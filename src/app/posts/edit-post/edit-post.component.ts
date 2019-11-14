import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import { PostsService } from '../services/posts.service';

import { Post } from '../models/post';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  id: string;
  post: Post;
  post$: Observable<Post>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.data.subscribe( (data: {post: Post}) => {
      this.post = data.post;
      this.post$ = of(this.post);
    });
  }

  updatePost(event) {
    this.postsService.updatePost(this.id, event).subscribe( () => {
      this.router.navigate([`posts/${this.id}`]);
    });
  }

  cancel() {
    this.router.navigate([`posts/${this.id}`]);
  }
}
