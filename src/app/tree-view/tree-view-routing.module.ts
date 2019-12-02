import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreeViewComponent} from './tree-view/tree-view.component';


const routes: Routes = [
  {
    path: 'tree',
    component: TreeViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreeViewRoutingModule { }
