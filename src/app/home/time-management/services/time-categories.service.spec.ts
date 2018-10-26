import { TestBed, inject } from '@angular/core/testing';

import { TimeCategoriesService } from './time-categories.service';

describe('TimeCategoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimeCategoriesService]
    });
  });

  it('should be created', inject([TimeCategoriesService], (service: TimeCategoriesService) => {
    expect(service).toBeTruthy();
  }));
});
