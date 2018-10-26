import { TestBed, inject } from '@angular/core/testing';

import { InternalCategoriesService } from './internal-categories.service';

describe('InternalCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InternalCategoriesService]
    });
  });

  it('should be created', inject([InternalCategoriesService], (service: InternalCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
