import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare, faMinusSquare} from '@fortawesome/free-regular-svg-icons';

import { OrganizationTree, Node } from '../mock-tree';

import { TreeViewService } from '../services/tree-view.service';

interface ModifiedData {
  node: Node;
  parent: number;
}


@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit, OnDestroy {
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
  faMinusSquare = faMinusSquare;
  faPlusSquare = faPlusSquare;

  nodes: Array<ModifiedData> = [];
  rootNodes;
  isCollapseAll = false;
  isCheckAll = false;
  form: FormGroup;
  highlightChildrenBorder = false;
  ascendingOrder = true;
  askPermissionToDelete = true;

  ngUnsubscribe: Subject<void>;

  constructor(
    private formBuilder: FormBuilder,
    private tree: OrganizationTree,
    private tvs: TreeViewService
  ) {
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit() {
    this.buildForm();
    this.buildNodes();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

  childUnchecked() {
    this.isCheckAll = false;
  }

  collapseAll() {
    this.isCollapseAll = !this.isCollapseAll;
  }

  toggleHighlightChildrenBorder() {
    this.highlightChildrenBorder = !this.highlightChildrenBorder;
  }

  shouldAskPermissionToDelete() {
    this.askPermissionToDelete = !this.askPermissionToDelete;
  }

  buildNodes() {
    this.tvs.getTree()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe( tree => {
      this.nodes = tree.map( item => {
        return  {node: new Node(item.id, item.title, []), parent: item.parent};
      });
      this.nodes.forEach(item => {
        if (item.parent) {
          const parentBranch = this.nodes.find(value => value.node.id === item.parent);
          parentBranch.node.children.push(item.node);
        }
      });
      this.rootNodes = this.getRootNodes();
      this.sortNode(this.rootNodes);
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

  private buildForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  addNode(value) {
    const node = {title: value};
    this.tvs.addNode(node)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe();
    this.buildNodes();
  }

  addNodeFromSection() {
    const newChildren = this.tvs.selectedNode;
    this.rootNodes.push(newChildren);
    this.sortNode(this.rootNodes);
    this.isCheckAll = false;
  }

  removeNode(id) {
    this.rootNodes.find( (item: Node, index, array) => {
      if (item.id === id) {
        array.splice(index, 1);
      }
      return item.id === id;
    });
  }

  drop() {
    this.addNodeFromSection();
    this.tvs.selectTargetNode();
  }

  dragOver(event) {
    event.preventDefault();
    event.target.classList.add('dragover');
    event.dataTransfer.dropEffect = 'move';
  }

  dragLeave(event) {
    event.target.classList.remove('dragover');
  }

  isChildren(id): boolean {
    return this.rootNodes.find((value) => {
      return value.id === id;
    });
  }

  scrollWindowUp() {
    window.scrollBy(0, -20 );
  }
}
