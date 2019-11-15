import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent {
  @Input() buttonText = 'Submit';

  @Output() emitFormValue = new EventEmitter<object>();

  authForm = this.formBuilder.group({
    email: [''],
    password: ['']
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  onSubmit() {
    this.emitFormValue.emit(this.authForm.value);
  }

}
