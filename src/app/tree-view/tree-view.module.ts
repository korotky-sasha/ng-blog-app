import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from './tree-view/tree-view.component';

import { TreeViewRoutingModule } from './tree-view-routing.module';
import { BranchComponent } from './branch/branch.component';
import { NodeHostDirective } from './tree-view/directives/node-host.directive';


@NgModule({
  declarations: [TreeViewComponent, BranchComponent, NodeHostDirective],
  imports: [
    CommonModule,
    TreeViewRoutingModule,
  ],
  // entryComponents: [BranchComponent]
})
export class TreeViewModule { }
