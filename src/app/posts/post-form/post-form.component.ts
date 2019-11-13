import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Observable} from 'rxjs';

import { NewPost } from '../models/new-post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Input() initialPost$?: Observable<NewPost>;

  @Output() emitFormValue = new EventEmitter<NewPost>();

  initialPost: NewPost;
  submitButtonText = 'Add post';

  postForm = this.formBuilder.group({
    title: [''],
    author: [''],
    content: [''],
    image: [''],
    description: ['']
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    if (this.initialPost$) {
      this.initialPost$.subscribe(value => {
        this.initialPost = value;
        this.postForm.get('title').setValue(this.initialPost.title);
        this.postForm.get('author').setValue(this.initialPost.author);
        this.postForm.get('content').setValue(this.initialPost.content);
        this.postForm.get('image').setValue(this.initialPost.image);
        this.postForm.get('description').setValue(this.initialPost.description);
      });
      this.submitButtonText = 'Update post';
    }
  }

  onSubmit() {
    this.emitFormValue.emit(this.postForm.value);
  }
}
