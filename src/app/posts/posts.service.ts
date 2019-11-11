import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Post } from './models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`//localhost:3000/api/posts` );
  }

  getPost(id): Observable<Post> {
    return this.http.get<Post>(`//localhost:3000/api/posts/${id}` );
  }

  deletePost(id): Observable<Post> {
    return this.http.delete<Post>(`//localhost:3000/api/posts/${id}`);
  }

  addPost(post): Observable<Post> {
    return this.http.post<Post>(`//localhost:3000/api/posts`, post);
  }

  updatePost(id, post): Observable<Post> {
    return this.http.put<Post>(`//localhost:3000/api/posts/${id}`, post);
  }
}
