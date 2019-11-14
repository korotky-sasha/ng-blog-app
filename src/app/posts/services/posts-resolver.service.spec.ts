import { TestBed } from '@angular/core/testing';

import { PostsResolverService } from './posts-resolver.service';

describe('PostsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostsResolverService = TestBed.get(PostsResolverService);
    expect(service).toBeTruthy();
  });
});
