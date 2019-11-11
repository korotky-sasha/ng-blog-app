import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostsService } from '../posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  newPost = {
    title: '',
    author: '',
    content: '',
    image: '',
    description: ''
  };

  constructor(
    private postsService: PostsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addPost() {
    this.postsService.addPost(this.newPost).subscribe(value => {
      console.log(value);
      this.router.navigate(['../']);
    });
  }

}
