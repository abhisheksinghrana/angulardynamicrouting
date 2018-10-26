import { TestBed, inject } from '@angular/core/testing';

import { WorklogService } from './worklog.service';

describe('WorklogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorklogService]
    });
  });

  it('should be created', inject([WorklogService], (service: WorklogService) => {
    expect(service).toBeTruthy();
  }));
});
