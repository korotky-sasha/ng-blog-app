import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';

import { PostsRoutingModule } from './posts-routing.module';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { PostFormComponent } from './post-form/post-form.component';


@NgModule({
  declarations: [PostsComponent, PostComponent, NewPostComponent, PostFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class PostsModule { }
