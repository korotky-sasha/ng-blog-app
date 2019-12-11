import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { take, takeUntil} from 'rxjs/operators';
import { MatDialog } from '@angular/material';

import {
  faCaretUp,
  faCaretDown,
  faTrash,
  faPlus,
  faEdit,
  faEllipsisV,
  faHandPaper
} from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare, faMinusSquare} from '@fortawesome/free-regular-svg-icons';

import { TreeViewService } from '../services/tree-view.service';

import { Node } from '../mock-tree';
import { ConfirmDialogComponent } from '../../posts/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit, OnDestroy {
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
  faTrash = faTrash;
  faPlus = faPlus;
  faEdit = faEdit;
  faEllipsisV = faEllipsisV;
  faHandPaper = faHandPaper;
  faMinusSquare = faMinusSquare;
  faPlusSquare = faPlusSquare;

  childrenHighlight = false;
  controlsExpanded = false;
  addChildMenuExpanded = false;
  editNodeMenuExpanded = false;

  parentRowRef: HTMLElement;
  buttonMenuRef: HTMLElement;

  formAddChild: FormGroup;
  formEditNode: FormGroup;

  ngUnsubscribe: Subject<void>;
  shouldDelete$: Observable<boolean>;
  shouldDelete = false;

  @Input() node: Node;
  @Input() parentId: number;
  @Input() askPermissionToDelete = true;

  @Output() deleted = new EventEmitter<number>();
  @Output() unchecked = new EventEmitter<boolean>();

  constructor(
    private tvs: TreeViewService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.ngUnsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.buildForms();
    this.sortNode();
    this.deleteChecker();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  deleteChecker() {
    this.shouldDelete$ = this.node.shouldDelete;
    this.shouldDelete$
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe( (value) => {
        this.shouldDelete = value;
        if (this.node.children.length) {
          this.node.children.forEach( item => {
            item.delete();
          });
        } else {
          this.deleteNode(this.node.id);
        }
      });
  }

  deleteNode(id) {
    this.tvs.deleteNode(id)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe( () => {
        this.deleted.emit(id);
      });
  }

  confirmDeleteNode() {
    if (this.askPermissionToDelete) {
      this.confirmDialog('Are you sure you want to delete this branch?')
        .pipe(
          take(1)
        )
        .subscribe( (respond) => {
          if (respond) {
            this.node.delete();
          }
        });
    } else {
      this.node.delete();
    }
  }

  removeChildNode(id) {
    this.node.children.find( (item: Node, index, array) => {
      if (item.id === id) {
        array.splice(index, 1);
      }
      return item.id === id;
    });
    if (this.shouldDelete && !this.node.children.length) {
      this.deleteNode(this.node.id);
    }
  }

  addNode(title) {
    this.tvs.addNode({title, parent: this.node.id})
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe( (respond) => {
      const newChildren = new Node(respond.id, respond.title, []);
      this.node.children.push(newChildren);
      this.sortNode();
      this.node.check(false, true);
      this.unchecked.emit(true);
    });
  }

  addNodeFromSelection() {
    // this.tvs.selectTargetNode(this.node.id);
    const newChildren = this.tvs.selectedNode;
    this.node.children.push(newChildren);
    this.sortNode();
    this.node.check(false, true);
    this.unchecked.emit(true);
  }

  editNode(title) {
    this.tvs.updateNode(this.node.id, { id: this.node.id, title, parent: this.parentId })
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe( (respond) => {
        this.node.title = respond.title;
      });
  }

  startMovingNode() {
    const targetNode = this.tvs.targetNode;
    targetNode
      .pipe(
        take(1)
      )
      .subscribe( (response) => {
        if (response || response === undefined) {
          this.moveNode(response);
        }
      });
    this.tvs.startSelecting(this.node);
  }

  moveNode(newParentId?) {
    const node = { id: this.node.id, title: this.node.title };
    if (newParentId) {
      Object.assign(node, {parent: newParentId});
    }
    this.tvs.updateNode(this.node.id, node)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe( () => {
        this.deleted.emit(this.node.id);
      });
  }

  private buildForms(): void {
    this.formAddChild = this.formBuilder.group({
      title: ['', Validators.required]
    });
    this.formEditNode = this.formBuilder.group({
      title: [ this.node.title, Validators.required]
    });
  }

  sortNode() {
    this.node.children.sort( (a, b) => {
      return  a.title > b.title ? 1 : -1;
    } );
    if (!this.node.ascendingOrder) {
      this.node.children.reverse();
    }
  }

  changeSortingOrder() {
    this.node.children.reverse();
    this.node.changeSortingOrder();
  }

  expandControls(event) {
    const button = event.path.find( (value) => {
      return value.classList.contains('button-expand');
    });
    this.buttonMenuRef = button.nextSibling;
    if (!this.controlsExpanded) {
      button.nextSibling.style.width = '144px';
      // button.nextSibling.style.width = 'fit-content';
    } else {
      button.nextSibling.style.width = '0';
    }
    this.editNodeMenuExpanded = false;
    this.addChildMenuExpanded = false;
    this.controlsExpanded = ! this.controlsExpanded;
  }

  expandAddChildMenu() {
    if (!this.addChildMenuExpanded) {
      this.buttonMenuRef.style.width = '423px';
      // this.buttonMenuRef.style.width = 'fit-content';
    } else {
      this.buttonMenuRef.style.width = '144px';
      // this.buttonMenuRef.style.width = 'fit-content';
    }
    this.addChildMenuExpanded = ! this.addChildMenuExpanded;
    this.editNodeMenuExpanded = false;
  }

  expandEditNodeMenu() {
    if (!this.editNodeMenuExpanded) {
      this.buttonMenuRef.style.width = '439px';
      // this.buttonMenuRef.style.width = 'fit-content';
    } else {
      this.buttonMenuRef.style.width = '144px';
      // this.buttonMenuRef.style.width = 'fit-content';
    }
    this.editNodeMenuExpanded = !this.editNodeMenuExpanded;
    this.addChildMenuExpanded = false;
  }

  nodeUnchecked() {
    this.node.check();
    if (!this.node.checked) {
      this.unchecked.emit(true);
    }
  }

  childUnchecked() {
    this.node.check(false, true);
    this.unchecked.emit(true);
  }

  confirmDialog(message?: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {message}
    });
    return  dialogRef.afterClosed();
  }

  dragStart(event) {
    const parent = event.path.find( (value) => {
      return value.classList.contains('parent');
    });
    parent.classList.add('moving');
    this.parentRowRef = parent;
    let title;
    Array.from(parent.children).forEach( (child: HTMLElement) => {
      if (child.classList.contains('title')) {
        title = child;
      }
    });
    if (title) {
      event.dataTransfer.setDragImage(title, -10, 10);
    }

    setTimeout(() => {
      this.node.toggle(true);
      event.dataTransfer.effectAllowed = 'copyMove';
      this.startMovingNode();
    }, 0);
  }

  dragEnd() {
    this.tvs.stopSelecting();
    this.parentRowRef.classList.remove('moving');
  }

  drop() {
    this.addNodeFromSelection();
    this.tvs.selectTargetNode(this.node.id);
  }

  dragOver(event) {
    event.preventDefault();
    event.target.classList.add('dragover');
    event.dataTransfer.dropEffect = 'move';
  }

  dragLeave(event) {
    event.target.classList.remove('dragover');
  }

  showDropZone(): boolean {
    return  this.tvs.isSelecting && this.tvs.selectedNode.id !== this.node.id && !this.isChildren(this.tvs.selectedNode.id);
  }

  isChildren(id) {
    return this.node.children.find((value) => {
      return value.id === id;
    });
  }
}
