import {Component, OnInit} from '@angular/core';

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
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[];

  constructor(
    private postsService: PostsService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.postsService.getPosts().subscribe(value => {
      this.posts = value;
      // console.log(this.posts);
    });
  }

}
