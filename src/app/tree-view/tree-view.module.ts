import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { TreeViewComponent } from './tree-view/tree-view.component';

import { TreeViewRoutingModule } from './tree-view-routing.module';
import { BranchComponent } from './branch/branch.component';


@NgModule({
  declarations: [TreeViewComponent, BranchComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    TreeViewRoutingModule,
    ReactiveFormsModule,
    DragDropModule
  ],
})
export class TreeViewModule { }
