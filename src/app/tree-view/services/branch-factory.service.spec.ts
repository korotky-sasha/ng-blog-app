import { TestBed } from '@angular/core/testing';

import { BranchFactoryService } from './branch-factory.service';

describe('BranchFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BranchFactoryService = TestBed.get(BranchFactoryService);
    expect(service).toBeTruthy();
  });
});
