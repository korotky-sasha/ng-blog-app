import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';

import { PostsResolverService } from './services/posts-resolver.service';
import { PostResolverService } from './services/post-resolver.service';

// @TODO: CanLoad and CanDeactivate guards

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'posts'},
  {path: 'posts', component: PostsComponent, resolve: {posts: PostsResolverService}},
  {path: 'posts/new', component: NewPostComponent}, // CanLoad and CanDeactivate guards
  {path: 'posts/edit/:id', component: EditPostComponent, resolve: {post: PostResolverService}}, // CanLoad and CanDeactivate guards
  {path: 'posts/:id', component: PostComponent, resolve: {post: PostResolverService}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
