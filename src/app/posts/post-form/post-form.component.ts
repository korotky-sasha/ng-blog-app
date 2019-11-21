import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Post } from '../../shared/models/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Input() post: Post = new Post();

  @Output() emitFormValue = new EventEmitter<Post>();

  @Output() emitFormChanged = new EventEmitter<boolean>();

  submitButtonText = 'Add post';

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.emitFormValue.emit(this.form.value);
  }

  onChange() {
    this.emitFormChanged.emit(true);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      title: [''],
      author: [''],
      content: [''],
      image: [''],
      description: ['']
    });

    this.form.patchValue(this.post);
    if ( this.post.title !== '') {
      this.submitButtonText = 'Update post';
    }
  }
}
