import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-or-add-dialog',
  templateUrl: './edit-or-add-dialog.component.html',
  styleUrls: ['./edit-or-add-dialog.component.scss']
})
export class EditOrAddDialogComponent implements OnInit {
  formAddChild: FormGroup;
  formEditNode: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditOrAddDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {message: string, title: string}
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.formAddChild = this.formBuilder.group({
      title: ['', Validators.required]
    });
    this.formEditNode = this.formBuilder.group({
      title: [ this.data.title, Validators.required]
    });
  }

  sendResult(title) {
    this.dialogRef.close(title);
  }
}
