import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Post {
  // tslint:disable-next-line:variable-name
  _id?: string;
  title: string;
  author: string;
  content: string;
  image: string;
  description: string;
  active: boolean;

  constructor() {
    this._id = '';
    this.title = '';
    this.author = '';
    this.content = '';
    this.image = '';
    this.description = '';
  }
}
