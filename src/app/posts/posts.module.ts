import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './new-post/new-post.component';


@NgModule({
  declarations: [PostsComponent, PostComponent, NewPostComponent],
  imports: [
    CommonModule,
    FormsModule,
    PostsRoutingModule
  ],
})
export class PostsModule { }
