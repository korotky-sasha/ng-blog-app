import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Node } from '../mock-tree';

@Injectable({
  providedIn: 'root'
})
export class TreeViewService {
  isSelecting: boolean;
  selectedNode: Node;
  targetNode$: Subject<number>;

  constructor(
    private http: HttpClient
  ) {
    this.isSelecting = false;
    this.targetNode$ = new Subject();
  }

  get targetNode(): Observable<number> {
    return this.targetNode$;
  }

  getTree(): Observable<any> {
    return this.http.get<any>(`/treedata` );
  }

  deleteNode(id): Observable<any> {
    return this.http.delete<any>(`/treedata/${id}`);
  }

  addNode(node): Observable<any> {
    return this.http.post<any>(`/treedata`, node);
  }

  updateNode(id, node): Observable<any> {
    return this.http.put<any>(`/treedata/${id}`, node);
  }

  startSelecting(node) {
    this.isSelecting = true;
    this.selectedNode = node;
  }

  stopSelecting() {
    this.isSelecting = false;
    this.targetNode$.next(NaN);
  }

  selectTargetNode(id?) {
    this.targetNode$.next(id);
    this.isSelecting = false;
    this.selectedNode = null;
  }
}
