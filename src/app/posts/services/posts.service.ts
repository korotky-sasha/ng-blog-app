import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Post } from '../../shared/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`/posts` );
  }

  getPost(id): Observable<Post> {
    return this.http.get<Post>(`/posts/${id}` );
  }

  deletePost(id): Observable<Post> {
    return this.http.delete<Post>(`/posts/${id}`);
  }

  addPost(post): Observable<Post> {
    return this.http.post<Post>(`/posts`, post);
  }

  updatePost(id, post): Observable<Post> {
    return this.http.put<Post>(`/posts/${id}`, post);
  }
}
