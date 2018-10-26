import { TestBed, inject } from '@angular/core/testing';

import { WorkItemService } from './work-item.service';

describe('WorkItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkItemService]
    });
  });

  it('should be created', inject([WorkItemService], (service: WorkItemService) => {
    expect(service).toBeTruthy();
  }));
});
