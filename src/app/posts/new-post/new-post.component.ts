import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostsService } from '../posts.service';

import { NewPost } from '../models/new-post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})

export class NewPostComponent implements OnInit {

  constructor(
    private postsService: PostsService,
    private router: Router
  ) { }

  ngOnInit() {}

  addPost(post: NewPost) {
    this.postsService.addPost(post).subscribe(value => {
      this.router.navigate([`/posts/${value._id}`]);
    });
  }
}
