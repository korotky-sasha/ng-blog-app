import { TestBed } from '@angular/core/testing';

import { TreeViewService } from './tree-view.service';

describe('BranchFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeViewService = TestBed.get(TreeViewService);
    expect(service).toBeTruthy();
  });
});
