import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OrganizationTree {
  data = [
    {id: 1, title: 'Branch 1'},
    {id: 2, title: 'Branch 1.1', parent: 1},
    {id: 3, title: 'Branch 2'},
    {id: 4, title: 'Branch 2.1', parent: 3},
    {id: 5, title: 'Branch 2.2', parent: 3},
    {id: 6, title: 'Branch 1.1.1', parent: 2},
    {id: 7, title: 'Branch 1.1.2', parent: 2},
    {id: 8, title: 'Branch 1.2', parent: 1},
    {id: 9, title: 'Branch 3'},
    {id: 23, title: 'Branch 1.1.2.1.4', parent: 10},
    {id: 10, title: 'Branch 1.1.2.1', parent: 7},
    {id: 11, title: 'Branch 1.1.2.1.1', parent: 10},
    {id: 12, title: 'Branch 3.1', parent: 9},
    {id: 13, title: 'Branch 4'},
    {id: 14, title: 'Branch 1.2.1', parent: 8},
    {id: 15, title: 'Branch 1.2.2', parent: 8},
    {id: 16, title: 'Branch 1.2.2.1', parent: 15},
    {id: 17, title: 'Branch 1.2.2.2', parent: 15},
    {id: 18, title: 'Branch 1.2.2.3', parent: 15},
    {id: 19, title: 'Branch 1.2.2.4', parent: 15},
    {id: 20, title: 'Branch 1.3', parent: 1},
    {id: 21, title: 'Branch 1.1.2.1.2', parent: 10},
    {id: 22, title: 'Branch 1.1.2.1.3', parent: 10},
  ];

  transformedData = [
    {id: 1, title: 'Branch 1', children: [
        {id: 2, title: 'Branch 1.1', parent: 1, children: [
            {id: 6, title: 'Branch 1.1.1', parent: 2, children: []},
            {id: 7, title: 'Branch 1.1.2', parent: 2, children: [
                {id: 10, title: 'Branch 1.1.2.1', parent: 7, children: [
                    {id: 11, title: 'Branch 1.1.2.1.1', parent: 10, children: []},
                  ]},
              ]},
          ]},
        {id: 8, title: 'Branch 1.2', parent: 1, children: []},
    ] },
    {id: 3, title: 'Branch 2', children: [
        {id: 4, title: 'Branch 2.1', parent: 3, children: []},
        {id: 5, title: 'Branch 2.2', parent: 3, children: []},
      ]},
    {id: 9, title: 'Branch 3', children: [
        {id: 12, title: 'Branch 3.1', parent: 9, children: []},
      ]},
    {id: 13, title: 'Branch 4', children: []},
  ];
}

export class Node {
  id: number;
  title: string;
  children: Array<Node>;
  collapsed: boolean;
  checked: boolean;
  highlighted: boolean;

  constructor(id, title, children) {
    this.id = id;
    this.title = title;
    this.children = children;
    this.collapsed = false;
    this.checked = false;
    this.highlighted = false;
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  check(state?) {
    const newState = state ? state : !this.checked;
    this.checked = newState;
    this.checkRecursive(newState);
  }

  checkRecursive(state) {
    this.children.forEach( child => {
      child.checked = state;
      child.checkRecursive(state);
    });
  }

  highlight(state?) {
    this.highlighted = state ? state : !this.highlighted;
  }
}
