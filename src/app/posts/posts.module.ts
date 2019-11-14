import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostFormComponent } from './post-form/post-form.component';
import { EditPostComponent } from './edit-post/edit-post.component';

import { PostsRoutingModule } from './posts-routing.module';


@NgModule({
  declarations: [PostsComponent, PostComponent, NewPostComponent, PostFormComponent, EditPostComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    PostsRoutingModule
  ],
})
export class PostsModule { }
