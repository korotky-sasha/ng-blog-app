import { Component, Input, OnInit } from '@angular/core';

import { Node } from '../mock-tree';

/*interface Branch {
  id: number;
  title: string;
  children: Branch[];
  collapsed: boolean;
}*/


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  // @Input() branch: Branch;
  @Input() node: Array<Node>;

  // collapsed = false;
  ascendingOrder = true;

  constructor(
  ) { }

  ngOnInit(): void {
    this.sortNode(this.node);
  }

  /*toggleCollapseChildren() {
    console.log(this.collapsed);
    this.collapsed = !this.collapsed;
    console.log(this.collapsed);
  }*/

  sortNode(arr: Array<Node>) {
    arr.sort( (a, b) => {
      return  a.title > b.title ? 1 : -1;
    } );
  }

  changeSortingOrder(arr) {
    arr.reverse();
    this.ascendingOrder = !this.ascendingOrder;
  }
}
