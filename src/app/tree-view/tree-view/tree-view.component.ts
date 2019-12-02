import { Component, OnInit } from '@angular/core';

import { OrganizationTree, Node } from '../mock-tree';

interface Branch {
  id: number;
  title: string;
  children: Branch[];
  collapsed: boolean;
}

interface ModifiedData {
  node: Node;
  parent: number;
}


@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {
  /*transformedData = [];
  private originalData = this.tree.data;*/
  nodes: Array<ModifiedData> = [];
  rootNodes;
  isCollapseAll = false;
  isCheckAll = false;
  highlightChildrenBorder = false;
  ascendingOrder = true;

  // data = this.tree.transformedData;

  constructor(
    private tree: OrganizationTree
  ) { }

  ngOnInit() {
    /*this.buildTree();
    console.log(this.getTree());*/
    this.buildNodes();
    this.rootNodes = this.getRootNodes();
    this.sortNode(this.rootNodes);
    console.log(this.rootNodes);
  }

  sortNode(arr: Array<Node>) {
    arr.sort( (a, b) => {
      return  a.title > b.title ? 1 : -1;
    } );
  }

  changeSortingOrder(arr) {
    arr.reverse();
    this.ascendingOrder = !this.ascendingOrder;
  }

  checkAll() {
    this.isCheckAll = !this.isCheckAll;
    this.rootNodes.forEach( item => {
      item.check(this.isCheckAll);
    });
  }

  collapseAll() {
    this.isCollapseAll = !this.isCollapseAll;
  }

  toggleHighlightChildrenBorder() {
    this.highlightChildrenBorder = !this.highlightChildrenBorder;
  }

  buildNodes() {
    this.tree.data.forEach( (item) => {
      this.nodes.push({node: new Node(item.id, item.title, []), parent: item.parent});
    });
    this.nodes.forEach(item => {
      if (item.parent) {
        const parentBranch = this.nodes.find(value => {
          return value.node.id === item.parent;
        });
        parentBranch.node.children.push(item.node);
      }
    });
  }

  getRootNodes() {
    const rootNodes = [];
    this.nodes.forEach(item => {
      if (!item.parent) {
        rootNodes.push(item.node);
      }
    });
    return rootNodes;
  }

  /*getTree(): Branch[] {
    const finalTree = [];
    this.originalData.forEach( (item) => {
      if (!item.parent) {
        finalTree.push(this.getBrunch(item.id));
      }
    } );
    return finalTree;
  }

  getBrunch(id): Branch {
    const rawBranch = this.transformedData.find(value => {
      return value.id === id;
    });
    if (rawBranch) {
      const branch = { id: rawBranch.id, title: rawBranch.title, children: [], collapsed: false };
      if (rawBranch && rawBranch.children) {
        rawBranch.children.forEach( item => {
          branch.children.push(this.getBrunch(item));
        });
      }
      return branch;
    }
  }

  buildTree() {
    this.tree.data.forEach( item => {
      this.transformedData.push(this.transformBrunch(item));
    });
    this.transformedData.forEach( item => {
      if (item.parent) {
        const parentBranch = this.transformedData.find( value => {
            return value.id === item.parent;
        });
        parentBranch.children.push(item.id);
      }
    });
  }

  transformBrunch(rawBranch) {
    return {...rawBranch, ...{children: [], collapsed: false}};
    // return {id: rawBranch.id, title: rawBranch.title, parent: rawBranch.parent, children: [], collapsed: false};
  }*/
}
