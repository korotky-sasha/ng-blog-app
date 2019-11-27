import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatDialogModule} from '@angular/material';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostFormComponent } from './shared/components/post-form/post-form.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { PostsRoutingModule } from './posts-routing.module';


@NgModule({
  declarations: [PostsComponent, PostComponent, NewPostComponent, PostFormComponent, EditPostComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    FontAwesomeModule,
    PostsRoutingModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class PostsModule { }
