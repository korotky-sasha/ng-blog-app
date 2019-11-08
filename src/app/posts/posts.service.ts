import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

interface Post {
  _id: string;
  title: string;
  author: string;
  content: string;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  token: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

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
    this.httpOptions.headers.append('Authorization', `Bearer ${this.token}`);
    return this.http.delete<Post>(`//localhost:3000/api/posts/${id}`, this.httpOptions);
  }
}
