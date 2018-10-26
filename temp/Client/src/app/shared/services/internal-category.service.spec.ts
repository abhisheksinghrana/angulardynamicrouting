import { TestBed, inject } from '@angular/core/testing';

import { InternalCategoryService } from './internal-category.service';

describe('InternalCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternalCategoryService]
    });
  });

  it('should be created', inject([InternalCategoryService], (service: InternalCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
