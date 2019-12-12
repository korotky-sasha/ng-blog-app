import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule, MatDialogModule } from '@angular/material';

import { TreeViewComponent } from './tree-view/tree-view.component';

import { TreeViewRoutingModule } from './tree-view-routing.module';
import { BranchComponent } from './branch/branch.component';
import { EditOrAddDialogComponent } from './shared/components/edit-or-add-dialog/edit-or-add-dialog.component';


@NgModule({
  declarations: [TreeViewComponent, BranchComponent, EditOrAddDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    TreeViewRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    EditOrAddDialogComponent
  ]
})
export class TreeViewModule { }
